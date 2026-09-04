import { NavLink } from "react-router-dom";
import heroImg from "../assets/HireLens-Hero.png";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden px-4 sm:px-6 py-12 lg:py-20 flex flex-col items-center justify-center">
      <div className="absolute top-1/4 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl -mt-20">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-12 items-center justify-items-center">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 w-full max-w-2xl lg:max-w-none mx-auto lg:mx-0">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
              From Resume to <br />
              <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Dream Career
              </span>
              , Instantly
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mx-auto lg:mx-0 hidden lg:block">
              Turn your resume into real opportunities. Discover AI-matched
              jobs, analyze skill gaps, and explore verified listings from
              Hirelens and live Adzuna partners.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto pt-2">
              <NavLink to="/jobs" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-700 active:scale-95 cursor-pointer"
                >
                  Explore All Jobs
                  <span className="text-lg">→</span>
                </button>
              </NavLink>

              <a href="#upload" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3.5 text-base font-semibold text-slate-800 dark:text-slate-200 shadow-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 cursor-pointer"
                >
                  Import Resume
                </button>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800 w-full max-w-sm sm:max-w-lg mx-auto lg:mx-0 lg:max-w-lg">
              <div className="text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  1k+
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Active Listings
                </p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  90%
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Match Accuracy
                </p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Instant
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Skill Extraction
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end">
            <div className="w-full max-w-lg xl:max-w-xl rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-indigo-500/10 p-2 sm:p-3">
              <img
                src={heroImg}
                alt="HireLens Career & AI Job Search Dashboard"
                className="w-full h-auto rounded-2xl object-cover aspect-4/3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
