function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Repository result pages"
      className="mt-6 flex items-center justify-center gap-3"
    >
      <button
        type="button"
        disabled={!hasPrevious}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-md border px-3 py-2 disabled:opacity-40"
      >
        Previous
      </button>

      <span className="text-sm text-slate-600">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        disabled={!hasNext}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-md border px-3 py-2 disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;