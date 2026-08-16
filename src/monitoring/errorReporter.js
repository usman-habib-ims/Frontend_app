import * as Sentry from "@sentry/react";

const IGNORED_ERROR_NAMES = [
  "ValidationError",
  "RepositoryNotFoundError",
  "AbortError",
];

export function shouldReportError(error) {
  return !IGNORED_ERROR_NAMES.includes(
    error?.name
  );
}

export function reportUnexpectedError(
  error,
  context = {}
) {
  if (!shouldReportError(error)) {
    return;
  }

  Sentry.withScope((scope) => {
    if (context.operation) {
      scope.setTag(
        "operation",
        context.operation
      );
    }

    Object.entries(context).forEach(
      ([key, value]) => {
        scope.setExtra(key, value);
      }
    );

    Sentry.captureException(error);
  });
}