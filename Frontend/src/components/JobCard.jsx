const JobCard = ({ job }) => {
  const formattedDate = new Date(job.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="w-full max-w-80 min-h-100 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Job Title & Company */}
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-200 line-clamp-2">
            {job.job_title}
          </h2>

          <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
            {job.job_publisher}
          </p>

          <p className="text-xs text-slate-400 dark:text-slate-400 mt-1">
            Posted {formattedDate}
          </p>
        </div>
      </div>

      {/* Job Information */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-300">
        <span>
          📍 {job.job_city}, {job.job_country}
        </span>
        <span>💼 {job.job_employment_type}</span>
      </div>

      {/* Salary */}
      {job.job_salary && (
        <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
          💰 {job.job_salary}
        </p>
      )}

      {/* Divider */}
      <div className="my-4 border-t border-slate-200 dark:border-slate-700" />

      {/* Skills */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Required Skills
        </p>

        <ul className="flex flex-wrap gap-2">
          {job.skills?.map((skill) => (
            <li
              key={skill}
              className="rounded-full bg-blue-50 dark:bg-blue-950 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          View Job
        </button>

        <button
          type="button"
          className="rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          ♡ Save
        </button>
      </div>
    </article>
  );
};

export default JobCard;
