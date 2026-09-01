import { useEffect } from "react";
import { myJobs } from "../../redux/features/job/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const PostedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myJobs());
  }, [dispatch]);

  const { jobsByRecruiter } = useSelector((state) => state.allJobs);

  console.log(jobsByRecruiter);

  if (jobsByRecruiter.length === 0) {
    return (
      <div className="flex items-center justify-center my-5">
        <div className="w-full lg:max-w-5xl max-w-75">
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-sm border border-slate-200 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl dark:bg-blue-950">
              🚀
            </div>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Build your next great team
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              Create a job listing, reach talented candidates, and find the
              right person for your team.
            </p>

            <NavLink
              to="/createJobs"
              className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 active:scale-95"
            >
              Create a Job →
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="my-10 w-full lg:max-w-5xl max-w-75">
        <h1 className="text-2xl text-center font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
          Your Posted Jobs
        </h1>

        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          Manage the jobs you've posted and track your listings.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Header */}
          <div className="hidden grid-cols-5 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300 md:grid">
            <span>Job Title</span>
            <span>Location</span>
            <span>Employment</span>
            <span>Salary</span>
            <span className="text-right">Action</span>
          </div>

          {/* Jobs */}
          <div>
            {jobsByRecruiter.map((job) => (
              <div
                key={job._id}
                className="grid grid-cols-1 gap-3 border-b border-slate-200 px-6 py-5 last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40 md:grid-cols-5 md:items-center md:gap-4"
              >
                {/* Job Title */}
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {job.job_title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    Job ID: {job.jobId}
                  </p>
                </div>

                {/* Location */}
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  {job.job_city}, {job.job_country}
                </div>

                {/* Employment Type */}
                <div>
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {job.job_employment_type}
                  </span>
                </div>

                {/* Salary */}
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {job.job_salary || "Not specified"}
                </div>

                {/* Action */}
                <div className="flex gap-2 md:justify-end">
                  <button
                    type="button"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 active:scale-95 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostedJobs;
