import { useEffect, useState } from "react";
import JobCard from "../components/jobs/JobCard";
import { getAllJobs, getAdzunaJobs } from "../redux/features/job/jobSlice";
import { useDispatch, useSelector } from "react-redux";

const Jobs = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    dispatch(getAllJobs());
    dispatch(getAdzunaJobs());
  }, [dispatch]);

  const { jobs, adzunaJobs, loading, adzunaLoading } = useSelector(
    (state) => state.allJobs,
  );

  const combinedJobs = [...jobs, ...adzunaJobs];
  const displayedJobs =
    activeTab === "adzuna"
      ? adzunaJobs
      : activeTab === "recruiter"
        ? jobs
        : combinedJobs;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Find Your Next Opportunity
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Browse verified job postings from recruiters and live external
            listings from Adzuna.
          </p>
        </div>

        {/* Main Grid: Sidebar Filters + Jobs List */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Left Sidebar - Filters Placeholder */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sticky top-26">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Filter Jobs
                </h2>
              </div>

              {/* Keyword Search Filter */}
              <div className="mt-4">
                <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                  Search Keywords
                </label>
                <input
                  type="text"
                  placeholder="e.g. Developer, React..."
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Location Filter */}
              <div className="mt-4">
                <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Remote, Mumbai..."
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Employment Type */}
              <div className="mt-4">
                <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-2">
                  Job Type
                </label>
                <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                      defaultChecked
                    />
                    Full-Time
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    Part-Time
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    Contract / Remote
                  </label>
                </div>
              </div>

              {/* Job Source Filter */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-2">
                  Job Provider
                </label>
                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab("all")}
                    className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition cursor-pointer ${
                      activeTab === "all"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    All Jobs ({combinedJobs.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("adzuna")}
                    className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition cursor-pointer ${
                      activeTab === "adzuna"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    Adzuna External ({adzunaJobs.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("recruiter")}
                    className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition cursor-pointer ${
                      activeTab === "recruiter"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    HireLens Jobs ({jobs.length})
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Area - Job Cards Grid */}
          <main className="lg:col-span-3">
            {/* Tab Selection Banner */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Showing{" "}
                <strong className="text-indigo-600 dark:text-indigo-400">
                  {displayedJobs.length}
                </strong>{" "}
                jobs
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={`rounded-xl px-4 py-1.5 text-xs font-medium transition cursor-pointer ${
                    activeTab === "all"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  All ({combinedJobs.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("adzuna")}
                  className={`rounded-xl px-4 py-1.5 text-xs font-medium transition cursor-pointer ${
                    activeTab === "adzuna"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  Adzuna ({adzunaJobs.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("recruiter")}
                  className={`rounded-xl px-4 py-1.5 text-xs font-medium transition cursor-pointer ${
                    activeTab === "recruiter"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  HireLens ({jobs.length})
                </button>
              </div>
            </div>

            {/* Loading Indicator */}
            {(loading || adzunaLoading) && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Fetching live Adzuna & platform jobs...
                </p>
              </div>
            )}

            {/* Job Grid */}
            {!loading &&
              !adzunaLoading &&
              (displayedJobs.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {displayedJobs.map((job) => (
                    <JobCard key={job.id || job._id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-12 text-center shadow-sm dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="mb-4 text-4xl">🔍</div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    No Jobs Found
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    No jobs match the selected filter tab. Try switching to "All
                    Jobs".
                  </p>
                </div>
              ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
