export class RepositoryNotFoundError extends Error {
  constructor(message = "Repository not found.") {
    super(message);
    this.name = "RepositoryNotFoundError";
  }
}