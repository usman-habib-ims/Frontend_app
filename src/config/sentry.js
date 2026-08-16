import * as Sentry from "@sentry/react";

export function initializeSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    console.warn(
      "Sentry DSN is missing. Monitoring is disabled."
    );

    return;
  }

  Sentry.init({
    dsn,

    environment: import.meta.env.MODE,

    integrations: [
      Sentry.browserTracingIntegration(),
    ],

    // tracesSampleRate: 0.2,
    tracesSampleRate: 1.0
  });
}