// import { MockRepositorySource } from "../data/MockRepositorySource";
// import { SearchRepositories } from "../application/useCases/SearchRepositories";
// import { GetRepositoryDetails } from "../application/useCases/GetRepositoryDetails";

// const repositorySource =
//   new MockRepositorySource();

// export const searchRepositories =
//   new SearchRepositories(repositorySource);

// export const getRepositoryDetails =
//   new GetRepositoryDetails(repositorySource);







import { FetchHttpClient } from "../infrastructure/http/FetchHttpClient";
import { GitHubApiClient } from "../infrastructure/api/GitHubApiClient";
import { githubConfig } from "../infrastructure/api/githubConfig";
import { GitHubRepositorySource } from "../infrastructure/repositories/GitHubRepositorySource";

import { SearchRepositories } from "../application/useCases/SearchRepositories";
import { GetRepositoryDetails } from "../application/useCases/GetRepositoryDetails";

const httpClient = new FetchHttpClient();

const githubApiClient = new GitHubApiClient({
  httpClient,
  config: githubConfig,
});

const repositorySource =
  new GitHubRepositorySource(
    githubApiClient
  );

export const searchRepositories =
  new SearchRepositories(repositorySource);

export const getRepositoryDetails =
  new GetRepositoryDetails(repositorySource);