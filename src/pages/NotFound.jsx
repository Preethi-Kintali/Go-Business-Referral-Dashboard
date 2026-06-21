import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <h1 className="text-9xl font-bold text-slate-800 mb-4">404</h1>
        <p className="text-lg text-slate-500 mb-8">Page not found</p>
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-500 font-bold hover:text-blue-600 transition-colors"
        >
          <FiArrowLeft size={16} />
          Back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
