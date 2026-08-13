export class GitHubRepositoryMapper {
  static toApplicationModel(data) {
    if (!data?.id || !data?.name || !data?.owner) {
      throw new Error(
        "GitHub repository response is missing required fields."
      );
    }

    return {
      id: data.id,
      name: data.name,
      fullName: data.full_name,

      owner: {
        id: data.owner.id,
        login: data.owner.login,
        avatarUrl: data.owner.avatar_url,
        profileUrl: data.owner.html_url,
        type: data.owner.type,
      },

      description: data.description,
      htmlUrl: data.html_url,
      homepage: data.homepage,

      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      openIssues: data.open_issues_count ?? 0,

      primaryLanguage: data.language,
      license: data.license?.name ?? null,
      topics: Array.isArray(data.topics)
        ? data.topics
        : [],

      defaultBranch: data.default_branch,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }
}