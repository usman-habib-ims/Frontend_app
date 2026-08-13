// import { ValidationError } from "../errors/ValidationError";
// import { RepositoryNotFoundError } from "../errors/RepositoryNotFoundError";

// export class GetRepositoryDetails {
//   constructor(repositorySource) {
//     this.repositorySource = repositorySource;
//   }

//   execute({ owner, repositoryName }) {
//     const normalizedOwner = String(owner ?? "")
//       .trim()
//       .toLowerCase();

//     const normalizedRepositoryName = String(
//       repositoryName ?? ""
//     )
//       .trim()
//       .toLowerCase();

//     if (!normalizedOwner) {
//       throw new ValidationError(
//         "Repository owner is required."
//       );
//     }

//     if (!normalizedRepositoryName) {
//       throw new ValidationError(
//         "Repository name is required."
//       );
//     }

//     const repository =
//       this.repositorySource.findByFullName(
//         normalizedOwner,
//         normalizedRepositoryName
//       );

//     if (!repository) {
//       throw new RepositoryNotFoundError();
//     }

//     return repository;
//   }
// }





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