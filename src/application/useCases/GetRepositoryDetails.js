import { ValidationError } from "../errors/ValidationError";
import { RepositoryNotFoundError } from "../errors/RepositoryNotFoundError";

export class GetRepositoryDetails {
  constructor(repositorySource) {
    this.repositorySource = repositorySource;
  }

  async execute({
    owner,
    repositoryName,
    signal,
  }) {
    const normalizedOwner = String(owner ?? "")
      .trim();

    const normalizedRepositoryName = String(
      repositoryName ?? ""
    ).trim();

    if (!normalizedOwner) {
      throw new ValidationError(
        "Repository owner is required."
      );
    }

    if (!normalizedRepositoryName) {
      throw new ValidationError(
        "Repository name is required."
      );
    }

    const repository =
      await this.repositorySource.findByFullName(
        normalizedOwner,
        normalizedRepositoryName,
        { signal }
      );

    if (!repository) {
      throw new RepositoryNotFoundError();
    }

    return repository;
  }
}