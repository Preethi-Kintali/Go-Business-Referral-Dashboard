import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold text-blue-500">
              Go Business
            </span>
          </div>
          <nav
            aria-label="Footer"
            className="flex space-x-6 text-sm text-slate-500 dark:text-slate-400"
          >
            <a
              href="#"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Privacy
            </a>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
          &copy; 2024 Go Business
        </div>
      </div>
    </footer>
  );
};

export default Footer;
