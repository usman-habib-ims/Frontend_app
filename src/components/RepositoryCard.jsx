function RepositoryCard({ repository, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(repository)}
      className={`w-full border-b border-slate-200 p-5 text-left transition ${
        isSelected
          ? "bg-blue-50 ring-1 ring-inset ring-blue-400"
          : "bg-white hover:bg-slate-50"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-semibold text-blue-600">{repository.fullName}</h2>
          <p className="mt-1 text-sm text-slate-500">
            {repository.owner.login}
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-700">
            {repository.description || "No description available."}
          </p>
        </div>
        <span aria-hidden="true" className="text-xl text-slate-500">
          ›
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-slate-600">
        <span>☆ {repository.stars.toLocaleString()}</span>
        <span>⑂ {repository.forks.toLocaleString()}</span>

        <span className="ml-auto">
          {repository.primaryLanguage || "Not specified"}
        </span>
      </div>
    </button>
  );
}

export default RepositoryCard;
