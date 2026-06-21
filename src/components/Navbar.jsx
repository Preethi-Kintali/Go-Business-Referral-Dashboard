import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "./Button";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center"
              aria-label="Go to dashboard home"
            >
              <span className="text-xl font-bold text-blue-500">
                Go Business
              </span>
            </Link>
          </div>

          <nav
            aria-label="Primary"
            className="hidden md:flex md:items-center md:space-x-4"
          >
            {isAuthenticated && (
              <Link
                to="/"
                className="text-sm font-medium text-slate-700 hover:text-blue-500 transition-colors mr-2"
              >
                Home
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Button
                  className="rounded-full bg-blue-500 text-white hover:bg-blue-600 px-6"
                  size="sm"
                >
                  Try for free
                </Button>
                <button
                  onClick={handleLogout}
                  className="rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50 px-5 py-1.5 text-sm font-medium transition-colors"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="primary"
                    size="sm"
                    className="rounded-full px-6"
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  Home
                </Link>
                <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-blue-500 hover:bg-slate-50">
                  Try for free
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-slate-50"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
