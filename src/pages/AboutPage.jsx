import { ArrowLeft, Search, Layers3, Activity } from "lucide-react";
import { FaGithub } from "react-icons/fa";

function AboutPage({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          <ArrowLeft size={17} />
          Back to Repo Finder
        </button>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
              <FaGithub size={22} />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                About Repo Finder
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Search and explore public GitHub repositories.
              </p>
            </div>
          </div>

          <p className="mt-6 leading-7 text-slate-600">
            Repo Finder is a React-based web application that allows users to
            search public GitHub repositories, browse paginated results, and
            view useful repository details such as stars, forks, open issues,
            programming language, license, topics, and repository links.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Main Features
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <FeatureCard
              icon={<Search size={20} />}
              title="Repository Search"
              description="Search public repositories using keywords and browse the results with pagination."
            />

            <FeatureCard
              icon={<FaGithub size={20} />}
              title="Repository Details"
              description="View important repository information in a simple and readable detail panel."
            />

            <FeatureCard
              icon={<Activity size={20} />}
              title="Monitoring"
              description="Sentry is used for unexpected error reporting and frontend performance monitoring."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8">
          <div className="flex items-center gap-3">
            <Layers3 size={21} className="text-blue-600" />

            <h2 className="text-xl font-semibold text-slate-900">
              Architecture
            </h2>
          </div>

          <p className="mt-4 leading-7 text-slate-600">
            Repo Finder follows a layered architecture to keep the user
            interface, application logic, and GitHub API integration separated.
            Dependency injection is used to connect the application use cases
            with the repository data source.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ArchitectureCard
              title="Presentation"
              description="React pages and reusable UI components."
            />

            <ArchitectureCard
              title="Application"
              description="Search and repository detail use cases."
            />

            <ArchitectureCard
              title="Infrastructure"
              description="GitHub API, HTTP communication, mapping, and errors."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-slate-900 p-8 text-white">
          <h2 className="text-xl font-semibold">Technologies</h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "React",
              "Vite",
              "JavaScript",
              "Tailwind CSS",
              "GitHub REST API",
              "Sentry",
            ].map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-200"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="text-blue-600">{icon}</div>

      <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}

function ArchitectureCard({ title, description }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <h3 className="font-medium text-slate-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

export default AboutPage;

// about page