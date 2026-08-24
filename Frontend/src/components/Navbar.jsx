import { useState } from "react";
import { MoonIcon, SunIcon, MenuIcon, XIcon } from "@animateicons/react/lucide";

import logo from "../assets/HireLens_Logo.png";

import { useTheme } from "../hooks/useTheme";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const { isAuthenticated, user } = useSelector((state) => state.login);

  if (isAuthenticated) {
    console.log("This user from navbar", user);
  }

  return (
    <nav className="w-full bg-slate-100 dark:bg-slate-950 border-b border-slate-400 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* brand */}
          <NavLink to="/">
            <p className="flex items-center gap-2 shrink-0">
              <img src={logo} alt="HireLens" className="w-9 h-9 rounded-lg" />
              <span className="text-xl font-bold tracking-tight text-slate-950 dark:text-slate-100">
                Hire<span className="text-blue-600">Lens</span>
              </span>
            </p>
          </NavLink>

          {/* desktop links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="group relative py-2">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-lg transition-colors ${
                      isActive
                        ? "text-blue-700 dark:text-blue-500 font-bold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
                <span
                  className={`absolute left-0 -bottom-px h-px bg-blue-500 transition-all ${
                    item.active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </li>
            ))}
          </ul>

          {/* right side */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={theme === "dark"}
              aria-label="Toggle theme"
              className="relative w-14 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-700 flex items-center px-1 transition-colors hover:border-slate-600"
            >
              <span
                className={`absolute w-6 h-6 rounded-full bg-slate-700 dark:bg-slate-950 border border-blue-600 flex items-center justify-center transition-transform ${
                  theme === "dark" ? "translate-x-6" : "translate-x-0"
                }`}
              >
                {theme === "dark" ? (
                  <MoonIcon size={20} duration={1} color="#ffffff" />
                ) : (
                  <SunIcon size={20} duration={1} color="#ffffff" />
                )}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="md:hidden text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? (
                <XIcon size={32} duration={1} />
              ) : (
                <MenuIcon size={32} duration={1} />
              )}
            </button>

            {user ? (
              <div>
                <NavLink to="/dashboard">
                  <img
                    className="w-8 h-8 rounded-full border border-slate-500 p-0.5 hidden md:block"
                    src={user.avatar}
                    alt={user.name}
                  />
                </NavLink>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="hidden md:block text-slate-200 bg-blue-600 px-4 py-1 rounded-sm font-medium active:scale-95"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile panel */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full md:hidden bg-slate-100 dark:bg-slate-950 border-t border-slate-300 dark:border-slate-800 shadow-lg">
            <div className="py-4 px-6">
              {/* Navigation */}
              <ul className="flex flex-col gap-1 text-sm font-medium">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `block px-3 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "text-blue-700 dark:text-blue-400 font-semibold bg-blue-100 dark:bg-slate-800"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-900"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Account section */}
              <div className="mt-4 pt-4 border-t border-slate-300 dark:border-slate-800">
                {user ? (
                  <NavLink
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-900 transition-colors"
                  >
                    <img
                      className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-600 p-0.5"
                      src={user.avatar}
                      alt={user.name}
                    />

                    <div className="flex-1 min-w-0 -mt-1">
                      <p className="font-semibold text-slate-800 dark:text-slate-100 truncate capitalize">
                        {user.name}
                      </p>

                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user.role === "recruiter" ? "Recruiter" : "Job Seeker"}
                      </p>
                    </div>

                    <span className="text-slate-400 dark:text-slate-500">
                      →
                    </span>
                  </NavLink>
                ) : (
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all active:scale-[0.98]"
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
