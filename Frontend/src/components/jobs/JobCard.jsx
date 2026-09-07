const badgeBase = "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold border";
const skillChip = "rounded-full bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 text-[11px] font-medium text-blue-700 dark:text-blue-300";

const btnBase = "inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition active:scale-95 cursor-pointer";
const viewBtnPrimary = `${btnBase} bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm`;
const viewBtnSecondary = `${btnBase} border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800`;
const applyExternalBtn = `${btnBase} bg-amber-500 hover:bg-amber-600 text-white shadow-sm`;

const saveBtnDefault = `${btnBase} border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800`;
const saveBtnActive = `${btnBase} bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 font-bold`;

const BookmarkIcon = ({ filled }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? "0" : "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
    >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
);

const JobCard = ({ job, onCardClick, isSaved = false, onToggleSave, isApplied = false }) => {
    let formattedDate = "Recent";
    if (job.createdAt) {
        try {
            const d = new Date(job.createdAt);
            if (!isNaN(d.getTime())) {
                formattedDate = d.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                });
            }
        } catch {
            formattedDate = "Recent";
        }
    }

    const skillList = Array.isArray(job.skills)
        ? job.skills
        : typeof job.skills === "string" && job.skills.trim()
            ? job.skills.split(",").map((s) => s.trim()).filter(Boolean)
            : [];

    return (
        <article
            onClick={() => onCardClick?.(job)}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition flex flex-col justify-between cursor-pointer"
        >
            <div>
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
                            {job.job_title}
                        </h2>
                        <p className="mt-0.5 text-sm font-medium text-slate-600 dark:text-slate-300">
                            {job.job_publisher}
                        </p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                            Posted {formattedDate}
                        </p>
                    </div>

                    {job.isExternal ? (
                        <span className={`${badgeBase} bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800`}>
                            Adzuna
                        </span>
                    ) : (
                        <span className={`${badgeBase} bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800`}>
                            HireLens
                        </span>
                    )}
                </div>

                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-300">
                    <span>📍 {job.job_city}, {job.job_country}</span>
                    <span>💼 {job.job_employment_type}</span>
                </div>

                {job.job_salary && (
                    <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        💰 {job.job_salary}
                    </p>
                )}

                <div className="my-3 border-t border-slate-200 dark:border-slate-800" />

                <div>
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Required Skills
                    </p>
                    {job.isExternal || skillList.length === 0 ? (
                        <p className="text-xs italic text-slate-400 dark:text-slate-500">
                            See required skills on opportunity provider platform
                        </p>
                    ) : (
                        <ul className="flex flex-wrap gap-1.5">
                            {skillList.map((skill, index) => (
                                <li key={`${skill}-${index}`} className={skillChip}>
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Action buttons on card */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    {job.isExternal ? (
                        <>
                            <a
                                href={job.redirect_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={applyExternalBtn}
                            >
                                Apply on Site ↗
                            </a>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCardClick?.(job);
                                }}
                                className={viewBtnSecondary}
                            >
                                View
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCardClick?.(job);
                                }}
                                className={viewBtnPrimary}
                            >
                                View
                            </button>
                            {isApplied && (
                                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                                    ✓ Applied
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave?.(job);
                    }}
                    className={isSaved ? saveBtnActive : saveBtnDefault}
                    title={isSaved ? "Remove from saved" : "Save job"}
                >
                    <BookmarkIcon filled={isSaved} />
                    <span>{isSaved ? "Saved" : "Save"}</span>
                </button>
            </div>
        </article>
    );
};

export default JobCard;
