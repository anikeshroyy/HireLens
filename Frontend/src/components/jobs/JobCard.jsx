const JobCard = ({ job }) => {
  const formattedDate = new Date(job.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const skillList = Array.isArray(job.skills)
    ? job.skills
    : typeof job.skills === "string" && job.skills.trim().length > 0
      ? job.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  return (
    <article className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-200 line-clamp-2">
              {job.job_title}
            </h2>

            <p className="mt-0.5 text-sm font-medium text-slate-600 dark:text-slate-300">
              {job.job_publisher}
            </p>

            <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5">
              Posted {formattedDate}
            </p>
          </div>

          {job.isExternal ? (
            <span className="shrink-0 rounded-full bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              Adzuna
            </span>
          ) : (
            <span className="shrink-0 rounded-full bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Hirelens
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-300">
          <span>
            📍 {job.job_city}, {job.job_country}
          </span>
          <span>💼 {job.job_employment_type}</span>
        </div>

        {job.job_salary && (
          <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            💰 {job.job_salary}
          </p>
        )}

        <div className="my-3 border-t border-slate-200 dark:border-slate-700" />

        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Required Skills
          </p>

          {job.isExternal || skillList.length === 0 ? (
            <p className="text-xs italic text-slate-500 dark:text-slate-400">
              See required skills on opportunity provider platform
            </p>
          ) : (
            <ul className="flex flex-wrap gap-1.5">
              {skillList.map((skill, index) => (
                <li
                  key={`${skill}-${index}`}
                  className="rounded-full bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 text-[11px] font-medium text-blue-700 dark:text-blue-300"
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
        {job.redirect_url ? (
          <a
            href={job.redirect_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 text-center"
          >
            Apply External ↗
          </a>
        ) : (
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
          >
            View Job
          </button>
        )}

        <button
          type="button"
          className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          ♡ Save
        </button>
      </div>
    </article>
  );
};

export default JobCard;
