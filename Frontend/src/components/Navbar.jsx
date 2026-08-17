import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import logo from "../assets/HireLens_Logo.png";

const NAV_ITEMS = [
  { label: "Home", href: "#", active: true },
  { label: "About", href: "#about", active: false },
  { label: "Contact", href: "#contact", active: false },
];

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* brand */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="HireLens" className="w-9 h-9 rounded-lg" />
            <span className="text-lg font-semibold tracking-tight text-slate-100">
              Hire<span className="text-teal-300">Lens</span>
            </span>
          </a>

          {/* desktop links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="group relative py-2">
                <a
                  href={item.href}
                  className={`transition-colors ${
                    item.active
                      ? "text-teal-300"
                      : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {item.label}
                </a>
                <span
                  className={`absolute left-0 -bottom-px h-px bg-teal-300 transition-all ${
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
              onClick={() => setIsDark(!isDark)}
              aria-pressed={isDark}
              aria-label="Toggle theme"
              className="relative w-14 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center px-1 transition-colors hover:border-slate-600"
            >
              <span
                className={`absolute w-6 h-6 rounded-full bg-slate-950 border border-teal-500 flex items-center justify-center transition-transform ${
                  isDark ? "translate-x-6" : "translate-x-0"
                }`}
              >
                {isDark ? (
                  <Moon className="w-3.5 h-3.5 text-teal-300" strokeWidth={2} />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-amber-200" strokeWidth={2} />
                )}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="md:hidden text-slate-300 hover:text-slate-100 p-1.5 rounded-lg hover:bg-slate-900 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* mobile panel */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col gap-1 text-sm font-medium">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg transition-colors ${
                      item.active
                        ? "text-teal-300 bg-teal-950"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-900"
                    }`}
                  >
                    {item.label}
                  </a>
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