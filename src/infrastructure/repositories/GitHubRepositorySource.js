import { GitHubRepositoryMapper } from "../mappers/GitHubRepositoryMapper";

export class GitHubRepositorySource {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search({
    query,
    page,
    pageSize,
    sort = "stars",
    order = "desc",
    signal,
  }) {
    const response =
      await this.apiClient.searchRepositories({
        query,
        page,
        pageSize,
        sort,
        order,
        signal,
      });

    return {
      items: response.items.map((item) =>
        GitHubRepositoryMapper.toApplicationModel(
          item
        )
      ),

      totalCount: response.total_count ?? 0,

      incompleteResults:
        response.incomplete_results ?? false,
    };
  }

  async findByFullName(
    owner,
    repositoryName,
    { signal } = {}
  ) {
    const response =
      await this.apiClient.getRepository({
        owner,
        repositoryName,
        signal,
      });

    return GitHubRepositoryMapper.toApplicationModel(
      response
    );
  }
}