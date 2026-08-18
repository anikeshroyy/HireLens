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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  console.log("current theme :", theme);

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
          </div>
        </div>

        {/* mobile panel */}
        {isOpen && (
          <div className="md:hidden pb-4 bg-slate-100 dark:bg-slate-950">
            <ul className="flex flex-col gap-1 text-sm font-medium">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? "text-blue-700 dark:text-blue-500 font-bold bg-blue-200 dark:bg-slate-800"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-900"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
