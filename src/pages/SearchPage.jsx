import { useState } from "react";
import SearchBar from "../components/SearchBar";
import RepositoryList from "../components/RepositoryList";
import RepositoryDetails from "../components/RepositoryDetails";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import { searchRepositories } from "../config/dependencies";

const PAGE_SIZE = 10;

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [selectedRepository, setSelectedRepository] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [totalCount, setTotalCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const runSearch = async (query, page) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await searchRepositories.execute({
        query,
        page,
        pageSize: PAGE_SIZE,
      });

      setRepositories(result.items);
      setTotalCount(result.totalCount);

      setCurrentPage(result.pagination.currentPage);

      setTotalPages(result.pagination.totalPages);

      setSelectedRepository(null);
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }

      setRepositories([]);
      setTotalCount(0);
      setTotalPages(1);
      setSelectedRepository(null);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    runSearch(searchQuery, 1);
  };

  const handlePageChange = (page) => {
    if (isLoading || page < 1 || page > totalPages) {
      return;
    }

    runSearch(searchQuery, page);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="text-3xl font-bold">Repo Finder</h1>

          <p className="mt-2 text-slate-600">
            Search and explore public GitHub repositories.
          </p>

          <div className="mt-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={handleSearch}
              isLoading={isLoading}
            />
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-red-700">
              {error}
            </p>
          )}

          {!error && totalCount > 0 && (
            <p className="mt-4 text-sm text-slate-600">
              {totalCount.toLocaleString()} repositories found
            </p>
          )}

          <div className="mt-5 grid gap-6 lg:grid-cols-2">
            <section>
              {isLoading ? (
                <div className="rounded-lg border bg-white p-8 text-center">
                  Loading repositories...
                </div>
              ) : (
                <RepositoryList
                  repositories={repositories}
                  selectedRepositoryId={selectedRepository?.id}
                  onSelectRepository={setSelectedRepository}
                />
              )}

              {!isLoading && totalCount > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </section>

            <section>
              <RepositoryDetails repository={selectedRepository} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SearchPage;
