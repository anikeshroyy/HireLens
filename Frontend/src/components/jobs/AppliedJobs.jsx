import { NavLink } from "react-router-dom";

const AppliedJobs = () => {
  return (
    <div className="my-10">
      <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-sm border border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl dark:bg-blue-950">
          💼
        </div>

        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Ready for your next opportunity?
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          Explore available jobs, find opportunities that match your skills, and
          start applying to your dream role.
        </p>

        <NavLink
          to="/jobs"
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 active:scale-95"
        >
          Explore Jobs →
        </NavLink>
      </div>
    </div>
  );
};

export default AppliedJobs;
