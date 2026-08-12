// function RepositoryDetails({ repository }) {
//   if (!repository) {
//     return (
//       <div className="flex min-h-80 items-center justify-center rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-500">
//         Select a repository to view its details.
//       </div>
//     );
//   }

//   return (
//     <article className="rounded-lg border border-slate-200 bg-white p-6">
//       <div className="flex flex-wrap items-start justify-between gap-4">
//         <div>
//           <h2 className="text-2xl font-bold text-slate-900">
//             {repository.fullName}
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             {repository.owner.login}
//           </p>
//         </div>

//         <a
//           href={repository.htmlUrl}
//           target="_blank"
//           rel="noreferrer"
//           className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
//         >
//           View on GitHub
//         </a>
//       </div>

//       <p className="mt-5 leading-7 text-slate-700">
//         {repository.description || "No description available."}
//       </p>

//       <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
//         <DetailItem label="Stars" value={repository.stars} />
//         <DetailItem label="Forks" value={repository.forks} />
//         <DetailItem label="Open issues" value={repository.openIssues} />
//         <DetailItem
//           label="Language"
//           value={repository.primaryLanguage || "Not specified"}
//         />
//       </div>

//       <div className="mt-6 space-y-2 text-sm text-slate-700">
//         <p>
//           <strong>Default branch:</strong>{" "}
//           {repository.defaultBranch || "Not specified"}
//         </p>

//         <p>
//           <strong>License:</strong>{" "}
//           {repository.license || "No license information"}
//         </p>
//       </div>

//       {repository.topics.length > 0 && (
//         <div className="mt-6">
//           <h3 className="font-semibold text-slate-900">Topics</h3>

//           <div className="mt-3 flex flex-wrap gap-2">
//             {repository.topics.map((topic) => (
//               <span
//                 key={topic}
//                 className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700"
//               >
//                 {topic}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </article>
//   );
// }

// function DetailItem({ label, value }) {
//   const displayValue =
//     typeof value === "number" ? value.toLocaleString() : value;

//   return (
//     <div className="rounded-lg bg-slate-50 p-3">
//       <p className="text-xs uppercase tracking-wide text-slate-500">
//         {label}
//       </p>

//       <p className="mt-1 font-semibold text-slate-900">
//         {displayValue}
//       </p>
//     </div>
//   );
// }

// export default RepositoryDetails;



import {
  ArrowLeft,
  Star,
  GitFork,
  CircleDot,
  CalendarDays,
  GitBranch,
  Scale,
  BookOpen,
  Users,
} from "lucide-react";

function RepositoryDetails({ repository, onBack }) {
  if (!repository) {
    return (
      <div className="flex min-h-[400px] items-center justify-center border-l border-slate-200 bg-white p-8 text-center text-slate-500">
        Select a repository to view its details.
      </div>
    );
  }

  const {
    fullName,
    owner,
    description,
    stars = 0,
    forks = 0,
    openIssues = 0,
    primaryLanguage,
    defaultBranch,
    license,
    topics = [],
    updatedAt,
    htmlUrl,
    homepage,
  } = repository;

  return (
    <article className="min-h-full border-l border-slate-200 bg-white px-8 py-8">
      {/* Back to results */}
      <button
        type="button"
        onClick={onBack}
        className="mb-10 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={15} />
        Back to results
      </button>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            {fullName}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {owner?.login}
          </p>
        </div>

        <a
          href={htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex overflow-hidden rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-900"
        >
          <span className="flex items-center gap-2 px-4 py-2.5">
            <Star size={16} />
            Star
          </span>

          <span className="border-l border-slate-200 px-4 py-2.5">
            {formatCompactNumber(stars)}
          </span>
        </a>
      </div>

      {/* Description */}
      <p className="mt-7 max-w-2xl leading-7 text-slate-700">
        {description || "No description available."}
      </p>

      {/* Metadata row */}
      <div className="mt-8 grid overflow-hidden rounded-xl bg-slate-50 sm:grid-cols-3">
        <MetaItem
          icon={
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          }
          value={primaryLanguage || "Not specified"}
        />

        <MetaItem
          icon={<GitBranch size={16} />}
          value={defaultBranch || "Not specified"}
        />

        <MetaItem
          icon={<Scale size={16} />}
          value={license || "No license"}
        />
      </div>

      {/* Stats row */}
      <div className="grid border-b border-slate-200 sm:grid-cols-4">
        <StatItem
          icon={<Star size={16} />}
          value={formatCompactNumber(stars)}
        />

        <StatItem
          icon={<GitFork size={16} />}
          value={formatCompactNumber(forks)}
        />

        <StatItem
          icon={<CircleDot size={16} />}
          value={formatCompactNumber(openIssues)}
        />

        <StatItem
          icon={<CalendarDays size={16} />}
          value={formatUpdatedDate(updatedAt)}
        />
      </div>

      {/* About */}
      <section className="mt-9 border-b border-slate-200 pb-8">
        <h3 className="text-lg font-semibold text-slate-950">
          About
        </h3>

        <p className="mt-4 max-w-3xl leading-7 text-slate-700">
          {description || "No description available."}
        </p>

        {homepage && (
          <a
            href={homepage}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm text-blue-600 hover:underline"
          >
            {homepage}
          </a>
        )}
      </section>

      {/* Topics */}
      {topics.length > 0 && (
        <section className="mt-8">
          <h3 className="text-lg font-semibold text-slate-950">
            Topics
          </h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600"
              >
                {topic}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Repository links */}
      <section className="mt-8 space-y-4 text-sm text-slate-700">
        <RepositoryLink
          icon={<BookOpen size={17} />}
          label="Readme"
        />

        <RepositoryLink
          icon={<Scale size={17} />}
          label={license || "License"}
        />

        <RepositoryLink
          icon={<Users size={17} />}
          label="Contributors"
        />
      </section>

      {/* Languages */}
      <section className="mt-10">
        <h3 className="text-lg font-semibold text-slate-950">
          Languages
        </h3>

        <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="w-[87%] bg-yellow-400" />
          <div className="w-[8%] bg-blue-500" />
          <div className="w-[3%] bg-violet-600" />
          <div className="w-[2%] bg-slate-300" />
        </div>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-700">
          <LanguageLegend
            colorClass="bg-yellow-400"
            label="JavaScript"
            value="87.4%"
          />

          <LanguageLegend
            colorClass="bg-blue-500"
            label="TypeScript"
            value="7.6%"
          />

          <LanguageLegend
            colorClass="bg-violet-600"
            label="CSS"
            value="3.1%"
          />

          <LanguageLegend
            colorClass="bg-slate-300"
            label="Other"
            value="1.9%"
          />
        </div>
      </section>
    </article>
  );
}

function MetaItem({ icon, value }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <span className="text-slate-900">
        {icon}
      </span>

      <span className="text-sm font-medium text-slate-800">
        {value}
      </span>
    </div>
  );
}

function StatItem({ icon, value }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <span className="text-slate-500">
        {icon}
      </span>

      <span className="text-sm text-slate-700">
        {value}
      </span>
    </div>
  );
}

function RepositoryLink({ icon, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-slate-500">
        {icon}
      </span>

      <span>{label}</span>
    </div>
  );
}

function LanguageLegend({
  colorClass,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2.5 w-2.5 rounded-full ${colorClass}`}
      />

      <span className="font-medium text-slate-800">
        {label}
      </span>

      <span className="text-slate-500">
        {value}
      </span>
    </div>
  );
}

function formatCompactNumber(value) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(".0", "")}m`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(".0", "")}k`;
  }

  return String(value);
}

function formatUpdatedDate(value) {
  if (!value) {
    return "Not available";
  }

  const updatedDate = new Date(value);
  const now = new Date();

  const differenceInMilliseconds =
    now.getTime() - updatedDate.getTime();

  const differenceInDays = Math.max(
    0,
    Math.floor(
      differenceInMilliseconds /
        (1000 * 60 * 60 * 24)
    )
  );

  if (differenceInDays === 0) {
    return "Updated today";
  }

  if (differenceInDays === 1) {
    return "Updated 1 day ago";
  }

  return `Updated ${differenceInDays} days ago`;
}

export default RepositoryDetails;