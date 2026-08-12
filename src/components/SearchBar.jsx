export default function SearchBar({
  onSubmit,
  value,
  onChange,
  isLoading = false,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!value.trim()) {
      return;
    }

    onSubmit();
  };
  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-3">
      <label htmlFor="repository-search" className="sr-only">
        Search Repository
      </label>

      <input
        id="repository-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search repositories"
        className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
