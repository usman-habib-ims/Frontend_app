import * as Sentry from "@sentry/react";

import "./App.css";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Sentry.ErrorBoundary
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-semibold text-slate-900">
              Something went wrong
            </h1>

            <p className="mt-3 text-sm text-slate-600">
              An unexpected error occurred.
              Please refresh the page and try again.
            </p>
          </div>
        </div>
      }
    >
      <SearchPage />
    </Sentry.ErrorBoundary>
  );
}

export default App;