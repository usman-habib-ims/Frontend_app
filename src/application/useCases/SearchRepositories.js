import { ValidationError } from "../errors/ValidationError";

export class SearchRepositories {
  constructor(repositorySource) {
    this.repositorySource = repositorySource;
  }

  async execute({
    query,
    page = 1,
    pageSize = 10,
    sort = "stars",
    order = "desc",
    signal,
  }) {
    const normalizedQuery = String(query ?? "")
      .trim();

    if (!normalizedQuery) {
      throw new ValidationError(
        "Search query is required."
      );
    }

    if (!Number.isInteger(page) || page < 1) {
      throw new ValidationError(
        "Page number must be a positive integer."
      );
    }

    if (
      !Number.isInteger(pageSize) ||
      pageSize < 1
    ) {
      throw new ValidationError(
        "Page size must be a positive integer."
      );
    }

    const result =
      await this.repositorySource.search({
        query: normalizedQuery,
        page,
        pageSize,
        sort,
        order,
        signal,
      });

    const totalPages = Math.max(
      1,
      Math.ceil(result.totalCount / pageSize)
    );

    return {
      query: normalizedQuery,
      items: result.items,
      totalCount: result.totalCount,
      incompleteResults:
        result.incompleteResults,

      pagination: {
        currentPage: page,
        pageSize,
        totalPages,
        hasPrevious: page > 1,
        hasNext: page < totalPages,
      },
    };
  }
}