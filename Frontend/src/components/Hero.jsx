import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className="w-full min-h-full bg-slate-100 dark:bg-slate-950 relative overflow-hidden">
      <div className="relative min-h-[75vh] flex flex-col items-center justify-center lg:pt-20 px-6 mb-10">
        <div className="text-center w-full lg:max-w-3xl">
          <h1
            className="fade-up text-slate-950 dark:text-slate-100 text-4xl lg:text-6xl font-semibold tracking-tight mb-4 leading-tight"
            style={{ animationDelay: "0.05s" }}
          >
            From Resume to <br />
            <span className="bg-linear-to-r from-blue-700 dark:from-blue-300 to-pink-800 dark:to-pink-400 bg-clip-text text-transparent pr-1.5">
              Dream Career
            </span>
            , Instantly
          </h1>
          <p
            className="fade-up text-slate-600 dark:text-slate-400 text-lg lg:text-xl max-w-xl mx-auto"
            style={{ animationDelay: "0.12s" }}
          >
            Turn your resume into opportunities — discover jobs that perfectly
            match your skills and experience.
          </p>
        </div>

        <NavLink to="/jobs">
          <button className="bg-blue-600 shadow-md  dark:shadow-slate-800 shadow-blue-900 text-slate-100 dark:text-slate-200 px-6 py-2 mt-10 cursor-pointer font-medium">
            Explore All Jobs
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Hero;
