import { useState } from "react";
import * as Sentry from "@sentry/react";

import "./App.css";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";

function App() {
  const [currentPage, setCurrentPage] =
    useState("search");

  const showAboutPage = () => {
    setCurrentPage("about");
  };

  const showSearchPage = () => {
    setCurrentPage("search");
  };

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
      {currentPage === "about" ? (
        <AboutPage onBack={showSearchPage} />
      ) : (
        <SearchPage onAbout={showAboutPage} />
      )}
    </Sentry.ErrorBoundary>
  );
}

export default App;