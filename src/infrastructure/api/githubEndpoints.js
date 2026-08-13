export const githubEndpoints = {
  searchRepositories({
    baseUrl,
    query,
    page,
    pageSize,
    sort = "stars",
    order = "desc",
  }) {
    const params = new URLSearchParams({
      q: query,
      page: String(page),
      per_page: String(pageSize),
      sort,
      order,
    });

    return `${baseUrl}/search/repositories?${params.toString()}`;
  },

  repositoryDetails({
    baseUrl,
    owner,
    repositoryName,
  }) {
    const encodedOwner = encodeURIComponent(owner);
    const encodedRepositoryName =
      encodeURIComponent(repositoryName);

    return `${baseUrl}/repos/${encodedOwner}/${encodedRepositoryName}`;
  },
};