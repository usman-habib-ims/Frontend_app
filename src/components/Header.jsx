import { FaGithub } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex h-[72px] items-center justify-between px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* <Github  /> */}
          <FaGithub size={18} strokeWidth={2.5} className="text-black" />
          <span className="text-lg font-semibold text-black">Repo Finder</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <a
            href="#about"
            className="text-sm text-gray-900 transition-colors hover:text-blue-600"
          >
            About
          </a>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-gray-900 transition-colors hover:text-blue-600"
          >
            <CiStar size={14} />
            <span>Star on GitHub</span>
          </a>
        </nav>

        {/* GitHub Link */}
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Open GitHub"
          className="text-black transition-opacity hover:opacity-70"
        >
          <FaGithub size={18} fill="currentColor" />
        </a>
      </div>
    </header>
  );
}

export default Header;
