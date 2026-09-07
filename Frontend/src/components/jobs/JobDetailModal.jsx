import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { applyToJob, resetApplyStatus } from "../../redux/features/job/jobSlice";

const backdrop = "fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm";
const panel = "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl scrollbar-none";
const badge = "inline-flex rounded-full px-3 py-1 text-xs font-medium";
const skillChip = "rounded-full bg-blue-50 dark:bg-blue-950 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300";

const BookmarkIcon = ({ filled }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? "0" : "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
    >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
);

const JobDetailModal = ({ job, onClose, appliedJobIds = [], isSaved = false, onToggleSave }) => {
    const dispatch = useDispatch();
    const { applyLoading, applySuccess, applyError } = useSelector((state) => state.allJobs);
    const { user } = useSelector((state) => state.login);

    const isExternal = !!job?.isExternal;
    const currentId = String(job?._id || job?.id || "");
    const alreadyApplied = appliedJobIds.some((id) => String(id) === currentId);

    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prevOverflow;
            dispatch(resetApplyStatus());
        };
    }, [dispatch]);

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    if (!job) return null;

    const handleApply = () => {
        if (!user) {
            alert("Please log in to apply for this job.");
            return;
        }
        if (!alreadyApplied && !applySuccess) {
            dispatch(applyToJob(job._id || job.id));
        }
    };

    const handleBackdrop = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const skillList = Array.isArray(job.skills)
        ? job.skills
        : typeof job.skills === "string" && job.skills.trim()
            ? job.skills.split(",").map((s) => s.trim()).filter(Boolean)
            : [];

    let formattedDate = null;
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
            formattedDate = null;
        }
    }

    const modalContent = (
        <div onClick={handleBackdrop} className={backdrop}>
            <div className={panel} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 p-6">
                    <div className="flex items-center gap-4 min-w-0">
                        {job.employer_logo ? (
                            <img
                                src={job.employer_logo}
                                alt={job.job_publisher}
                                className="h-12 w-12 rounded-xl object-contain border border-slate-200 dark:border-slate-700 bg-white p-1 shrink-0"
                                onError={(e) => { e.currentTarget.style.display = "none"; }}
                            />
                        ) : (
                            <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-xl shrink-0">
                                🏢
                            </div>
                        )}
                        <div className="min-w-0">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                                {job.job_title}
                            </h2>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-0.5">
                                {job.job_publisher}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-white transition shrink-0 cursor-pointer"
                        title="Close modal"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Meta chips */}
                    <div className="flex flex-wrap gap-2">
                        <span className={`${badge} bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300`}>
                            📍 {job.job_city || "Location flexible"}, {job.job_country || ""}
                        </span>
                        <span className={`${badge} bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300`}>
                            💼 {job.job_employment_type || "Full-Time"}
                        </span>
                        {job.job_salary && (
                            <span className={`${badge} bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300`}>
                                💰 {job.job_salary}
                            </span>
                        )}
                        {isExternal ? (
                            <span className={`${badge} bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800`}>
                                Adzuna
                            </span>
                        ) : (
                            <span className={`${badge} bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300`}>
                                HireLens
                            </span>
                        )}
                        {formattedDate && (
                            <span className="text-xs text-slate-400 dark:text-slate-500 self-center">
                                Posted {formattedDate}
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    {job.job_description && (
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                                Job Description
                            </h3>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                {job.job_description}
                            </p>
                        </div>
                    )}

                    {/* Skills */}
                    {!isExternal && skillList.length > 0 && (
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                                Required Skills
                            </h3>
                            <ul className="flex flex-wrap gap-2">
                                {skillList.map((skill, i) => (
                                    <li key={`${skill}-${i}`} className={skillChip}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Feedback messages */}
                    {applySuccess && (
                        <div className="rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                            ✅ Application submitted successfully!
                        </div>
                    )}
                    {applyError && (
                        <div className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                            {applyError}
                        </div>
                    )}
                </div>

                {/* Footer actions */}
                <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 px-6 py-4">
                    {onToggleSave && (
                        <button
                            type="button"
                            onClick={() => onToggleSave(job)}
                            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-95 cursor-pointer ${
                                isSaved
                                    ? "bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400"
                                    : "border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                        >
                            <BookmarkIcon filled={isSaved} />
                            <span>{isSaved ? "Saved" : "Save Job"}</span>
                        </button>
                    )}

                    <div className="flex items-center gap-3 ml-auto">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                        >
                            Close
                        </button>

                        {isExternal ? (
                            <a
                                href={job.redirect_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-5 py-2 text-sm font-semibold text-white transition active:scale-95"
                            >
                                Apply on Site ↗
                            </a>
                        ) : (
                            <button
                                type="button"
                                onClick={handleApply}
                                disabled={applyLoading || alreadyApplied || applySuccess}
                                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed px-5 py-2 text-sm font-semibold text-white transition active:scale-95 cursor-pointer"
                            >
                                {applyLoading && (
                                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                )}
                                {alreadyApplied || applySuccess ? "✓ Applied" : applyLoading ? "Applying..." : "Apply Now"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default JobDetailModal;
