** Presentation Layer **

The Presentation Layer contains the React user interface of Repo Finder. It is responsible for repository search input, result rendering, repository selection, detail display, pagination, and UI feedback states.

The current implementation uses mock repository data so the component structure and responsive layout can be developed before GitHub API integration.

== Main Components

- `SearchPage` — owns search, pagination, and repository selection state.
- `SearchBar` — accepts and submits the repository search query.
- `RepositoryList` — renders repository results.
- `RepositoryCard` — displays a repository summary and emits selection events.
- `RepositoryDetails` — displays information about the selected repository.
- `Pagination` — handles result-page navigation.

== Data Flow

The layer follows one-way data flow:

== text
Parent components pass data through props.
Child components return user actions through callbacks.

src/
├── components/
│ ├── SearchBar.jsx
│ ├── RepositoryList.jsx
│ ├── RepositoryCard.jsx
│ ├── RepositoryDetails.jsx
│ ├── Pagination.jsx
│ ├── LoadingState.jsx
│ ├── ErrorState.jsx
│ └── EmptyState.jsx
│
├── data/
│ └── mockRepositories.js
│
└── pages/
└── SearchPage.jsx
=============================================================================================================

** Application Layer **

The Application Layer contains the main repository-related use cases and coordinates application workflows independently from React and the external data provider.

== Use Cases

- `SearchRepositories` validates search criteria, filters repository data, applies pagination, and returns a structured search result.
- `GetRepositoryDetails` validates repository identity and returns one repository or a not-found error.

== Dependency Injection

The use cases receive a repository source through their constructors. The current implementation uses `MockRepositorySource`, which will later be replaced by a GitHub-based Infrastructure implementation.

== Current Flow

== text
SearchPage
→ SearchRepositories
→ MockRepositorySource
→ Mock Repository Data
→ Search Result
→ SearchPage

src/
├── application/
│ ├── useCases/
│ │ ├── SearchRepositories.js
│ │ └── GetRepositoryDetails.js
│ └── errors/
│ ├── ValidationError.js
│ └── RepositoryNotFoundError.js
│
├── config/
│ └── dependencies.js
│
├── data/
│ ├── mockRepositories.js
│ └── MockRepositorySource.js
│
├── components/
├── pages/
├── App.jsx
└── main.jsx

============================================================================================================

** Infrastructure Layer **

The Infrastructure Layer connects Repo Finder to the GitHub REST API.

It is responsible for:

- `FetchHttpClient` for generic HTTP requests
- `GitHubApiClient` for GitHub endpoints and headers
- `GitHubRepositorySource` for repository search and detail operations
- `GitHubRepositoryMapper` for converting GitHub responses into internal camelCase models
- `ApiError` for consistent network, HTTP, rate-limit, and response errors
- GitHub endpoint and configuration modules

The Infrastructure Layer is isolated from the React UI and Application use cases. The rest of the application does not directly work with GitHub URLs, HTTP status codes, or raw API response fields.

== text
Application Use Case
→ GitHubRepositorySource
→ GitHubApiClient
→ FetchHttpClient
→ GitHub REST API
→ GitHubRepositoryMapper
→ Application Result

src/
└── infrastructure/
├── api/
│ ├── githubConfig.js
│ ├── githubEndpoints.js
│ └── GitHubApiClient.js
│
├── http/
│ └── FetchHttpClient.js
│
├── mappers/
│ └── GitHubRepositoryMapper.js
│
├── repositories/
│ └── GitHubRepositorySource.js
│
└── errors/
└── ApiError.js

===========================================================================================================
