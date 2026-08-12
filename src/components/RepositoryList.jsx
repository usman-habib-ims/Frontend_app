import RepositoryCard from "./RepositoryCard";
function RepositoryList({
  repositories,
  selectedRepositoryId,
  onSelectRepository,
}) {
  if (repositories.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600">
        No repository found
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      {repositories.map((repository) => (
        <RepositoryCard
          key={repository.id}
          repository={repository}
          isSelected={selectedRepositoryId === repository.id}
          onSelect={onSelectRepository}
        />
      ))}
    </div>
  );
}

export default RepositoryList;
