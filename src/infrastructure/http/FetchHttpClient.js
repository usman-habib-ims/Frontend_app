import { ApiError } from "../errors/ApiError";

export class FetchHttpClient {
  async get(url, { headers = {}, signal } = {}) {
    let response;

    try {
      response = await fetch(url, {
        method: "GET",
        headers,
        signal,
      });
    } catch (error) {
      if (error.name === "AbortError") {
        throw error;
      }

      throw new ApiError(
        "Unable to connect to GitHub. Check your internet connection.",
        {
          code: "NETWORK_ERROR",
        }
      );
    }

    if (!response.ok) {
      throw await this.createApiError(response);
    }

    try {
      return await response.json();
    } catch {
      throw new ApiError(
        "GitHub returned an invalid response.",
        {
          status: response.status,
          code: "INVALID_API_RESPONSE",
        }
      );
    }
  }

  async createApiError(response) {
    let responseBody = null;

    try {
      responseBody = await response.json();
    } catch {
      // The response may not contain JSON.
    }

    const remainingRequests = response.headers.get(
      "x-ratelimit-remaining"
    );

    const resetTimestamp = response.headers.get(
      "x-ratelimit-reset"
    );

    const isRateLimitError =
      (response.status === 403 ||
        response.status === 429) &&
      remainingRequests === "0";

    if (isRateLimitError) {
      return new ApiError(
        "GitHub's request limit has been reached.",
        {
          status: response.status,
          code: "RATE_LIMIT_EXCEEDED",
          resetAt: resetTimestamp
            ? new Date(
                Number(resetTimestamp) * 1000
              )
            : null,
        }
      );
    }

    if (response.status === 404) {
      return new ApiError(
        "The requested repository was not found.",
        {
          status: 404,
          code: "RESOURCE_NOT_FOUND",
        }
      );
    }

    return new ApiError(
      responseBody?.message ||
        "GitHub request failed.",
      {
        status: response.status,
        code: "GITHUB_API_ERROR",
      }
    );
  }
}