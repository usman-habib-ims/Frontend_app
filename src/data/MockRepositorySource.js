import { mockRepositories } from "./mockRepositories";

export class MockRepositorySource {
  getAll() {
    return mockRepositories;
  }

  findByFullName(owner, repositoryName) {
    return (
      mockRepositories.find((repository) => {
        const [repositoryOwner, repositoryNamePart] =
          repository.fullName
            .toLowerCase()
            .split("/");

        return (
          repositoryOwner === owner &&
          repositoryNamePart === repositoryName
        );
      }) ?? null
    );
  }
}