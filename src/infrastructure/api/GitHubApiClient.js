import { githubEndpoints } from "./githubEndpoints";

export class GitHubApiClient {
  constructor({
    httpClient,
    config,
  }) {
    this.httpClient = httpClient;
    this.config = config;
  }

  searchRepositories({
    query,
    page,
    pageSize,
    sort = "stars",
    order = "desc",
    signal,
  }) {
    const url =
      githubEndpoints.searchRepositories({
        baseUrl: this.config.baseUrl,
        query,
        page,
        pageSize,
        sort,
        order,
      });

    return this.httpClient.get(url, {
      signal,
      headers: this.createHeaders(),
    });
  }

  getRepository({
    owner,
    repositoryName,
    signal,
  }) {
    const url =
      githubEndpoints.repositoryDetails({
        baseUrl: this.config.baseUrl,
        owner,
        repositoryName,
      });

    return this.httpClient.get(url, {
      signal,
      headers: this.createHeaders(),
    });
  }

  createHeaders() {
    return {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version":
        this.config.apiVersion,
    };
  }
}