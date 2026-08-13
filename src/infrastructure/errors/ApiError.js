export class ApiError extends Error {
  constructor(
    message,
    {
      status = null,
      code = "API_ERROR",
      resetAt = null,
    } = {}
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.resetAt = resetAt;
  }
}