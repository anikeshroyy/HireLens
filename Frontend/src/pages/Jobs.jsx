import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../components/jobs/JobCard";
import JobDetailModal from "../components/jobs/JobDetailModal";
import { getAllJobs, getAdzunaJobs, getAppliedJobs, getSavedJobs, toggleSaveJob } from "../redux/features/job/jobSlice";

const tabBtn = (isActive) =>
    `rounded-xl px-4 py-1.5 text-xs font-medium transition cursor-pointer ${
        isActive
            ? "bg-indigo-600 text-white shadow-sm"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-slate-800 dark:text-slate-300"
    }`;

const sidebarTabBtn = (isActive) =>
    `w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition cursor-pointer ${
        isActive
            ? "bg-indigo-600 text-white shadow-sm"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 dark:bg-slate-800 dark:text-slate-300"
    }`;

const JOB_TYPES = ["Full-Time", "Part-Time", "Contract / Remote", "Internship"];

const Jobs = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("all");
    const [selectedJob, setSelectedJob] = useState(null);

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [selectedJobTypes, setSelectedJobTypes] = useState([]);

    const { user } = useSelector((state) => state.login);
    const { jobs, adzunaJobs, appliedJobs, savedJobs, loading, adzunaLoading } = useSelector(
        (state) => state.allJobs
    );

    useEffect(() => {
        dispatch(getAllJobs());
        dispatch(getAdzunaJobs());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            dispatch(getAppliedJobs());
            dispatch(getSavedJobs());
        }
    }, [dispatch, user]);

    const appliedJobIds = (Array.isArray(appliedJobs) ? appliedJobs : [])
        .map((j) => String(j?._id || j?.id))
        .filter(Boolean);

    const savedJobIds = (Array.isArray(savedJobs) ? savedJobs : [])
        .map((s) => String(s?.jobId || s?._id || s?.id))
        .filter(Boolean);

    const handleToggleSave = (job) => {
        if (!user) {
            alert("Please log in to save jobs.");
            return;
        }
        const jobId = String(job._id || job.id);
        dispatch(toggleSaveJob({ jobId, jobData: job }));
    };

    const handleTypeToggle = (type) => {
        setSelectedJobTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const handleResetFilters = () => {
        setSearchTerm("");
        setLocationFilter("");
        setSelectedJobTypes([]);
        setActiveTab("all");
    };

    const handleAdzunaSearch = (e) => {
        e?.preventDefault();
        dispatch(getAdzunaJobs({ what: searchTerm.trim() || "developer", where: locationFilter.trim() }));
    };

    const hasActiveFilters =
        searchTerm.trim() !== "" ||
        locationFilter.trim() !== "" ||
        selectedJobTypes.length > 0 ||
        activeTab !== "all";

    const combinedJobs = [...jobs, ...adzunaJobs];
    const sourceJobs =
        activeTab === "adzuna" ? adzunaJobs :
        activeTab === "recruiter" ? jobs :
        combinedJobs;

    // Apply client-side filters
    const filteredJobs = sourceJobs.filter((job) => {
        // Keyword filter
        if (searchTerm.trim()) {
            const query = searchTerm.toLowerCase().trim();
            const title = (job.job_title || "").toLowerCase();
            const company = (job.job_publisher || "").toLowerCase();
            const desc = (job.job_description || "").toLowerCase();
            const skills = Array.isArray(job.skills)
                ? job.skills.join(" ").toLowerCase()
                : typeof job.skills === "string"
                    ? job.skills.toLowerCase()
                    : "";

            const matchesKeyword =
                title.includes(query) ||
                company.includes(query) ||
                desc.includes(query) ||
                skills.includes(query);

            if (!matchesKeyword) return false;
        }

        // Location filter
        if (locationFilter.trim()) {
            const locQuery = locationFilter.toLowerCase().trim();
            const city = (job.job_city || "").toLowerCase();
            const country = (job.job_country || "").toLowerCase();

            const matchesLocation = city.includes(locQuery) || country.includes(locQuery);
            if (!matchesLocation) return false;
        }

        // Job type filter
        if (selectedJobTypes.length > 0) {
            const empType = (job.job_employment_type || "").toLowerCase();
            const city = (job.job_city || "").toLowerCase();

            const matchesType = selectedJobTypes.some((type) => {
                if (type === "Full-Time") return empType.includes("full");
                if (type === "Part-Time") return empType.includes("part");
                if (type === "Contract / Remote") {
                    return (
                        empType.includes("contract") ||
                        empType.includes("remote") ||
                        empType.includes("freelance") ||
                        city.includes("remote")
                    );
                }
                if (type === "Internship") return empType.includes("intern");
                return empType.includes(type.toLowerCase());
            });

            if (!matchesType) return false;
        }

        return true;
    });

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 px-4 py-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 text-center sm:text-left">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Find Your Next Opportunity
                    </h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Browse verified job postings from recruiters and live external listings from Adzuna.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <form
                            onSubmit={handleAdzunaSearch}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sticky top-24"
                        >
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Filter Jobs
                                </h2>
                                {hasActiveFilters && (
                                    <button
                                        type="button"
                                        onClick={handleResetFilters}
                                        className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                                    >
                                        Reset All
                                    </button>
                                )}
                            </div>

                            {/* Search Keyword */}
                            <div className="mt-4">
                                <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                                    Search Keywords
                                </label>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="e.g. Developer, React..."
                                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            {/* Location */}
                            <div className="mt-4">
                                <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                    placeholder="e.g. Remote, Mumbai..."
                                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            {/* Job Type Checkboxes */}
                            <div className="mt-4">
                                <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-2">
                                    Job Type
                                </label>
                                <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                    {JOB_TYPES.map((type) => {
                                        const isChecked = selectedJobTypes.includes(type);
                                        return (
                                            <label key={type} className="flex items-center gap-2 cursor-pointer select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => handleTypeToggle(type)}
                                                    className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 cursor-pointer"
                                                />
                                                <span className={isChecked ? "font-semibold text-slate-900 dark:text-white" : ""}>
                                                    {type}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Provider Filter */}
                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-2">
                                    Job Provider
                                </label>
                                <div className="flex flex-col gap-1.5">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab("all")}
                                        className={sidebarTabBtn(activeTab === "all")}
                                    >
                                        All Jobs ({combinedJobs.length})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab("adzuna")}
                                        className={sidebarTabBtn(activeTab === "adzuna")}
                                    >
                                        Adzuna External ({adzunaJobs.length})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab("recruiter")}
                                        className={sidebarTabBtn(activeTab === "recruiter")}
                                    >
                                        HireLens Jobs ({jobs.length})
                                    </button>
                                </div>
                            </div>

                            {/* Search external Adzuna query trigger */}
                            {(searchTerm.trim() || locationFilter.trim()) && (
                                <button
                                    type="submit"
                                    className="mt-4 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-2 text-xs font-semibold transition active:scale-95 cursor-pointer shadow-sm"
                                >
                                    Fetch External Matches ↗
                                </button>
                            )}
                        </form>
                    </aside>

                    {/* Job List */}
                    <main className="lg:col-span-3">
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Showing{" "}
                                <strong className="text-indigo-600 dark:text-indigo-400">
                                    {filteredJobs.length}
                                </strong>{" "}
                                {filteredJobs.length === 1 ? "job" : "jobs"}
                                {hasActiveFilters && (
                                    <span className="text-xs text-slate-400 ml-1">
                                        (filtered from {sourceJobs.length})
                                    </span>
                                )}
                            </span>

                            <div className="flex gap-2">
                                <button type="button" onClick={() => setActiveTab("all")} className={tabBtn(activeTab === "all")}>
                                    All ({combinedJobs.length})
                                </button>
                                <button type="button" onClick={() => setActiveTab("adzuna")} className={tabBtn(activeTab === "adzuna")}>
                                    Adzuna ({adzunaJobs.length})
                                </button>
                                <button type="button" onClick={() => setActiveTab("recruiter")} className={tabBtn(activeTab === "recruiter")}>
                                    HireLens ({jobs.length})
                                </button>
                            </div>
                        </div>

                        {(loading || adzunaLoading) && (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
                                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                                    Fetching live Adzuna & platform jobs...
                                </p>
                            </div>
                        )}

                        {!loading && !adzunaLoading && (
                            filteredJobs.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredJobs.map((job) => (
                                        <JobCard
                                            key={job.id || job._id}
                                            job={job}
                                            onCardClick={setSelectedJob}
                                            isSaved={savedJobIds.includes(String(job._id || job.id))}
                                            onToggleSave={handleToggleSave}
                                            isApplied={appliedJobIds.includes(String(job._id || job.id))}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-12 text-center shadow-sm dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                    <div className="mb-4 text-4xl">🔍</div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Jobs Found</h3>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                                        No jobs match your current search and filter criteria. Try adjusting keywords, location, or job type.
                                    </p>
                                    {hasActiveFilters && (
                                        <button
                                            type="button"
                                            onClick={handleResetFilters}
                                            className="mt-5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95 cursor-pointer"
                                        >
                                            Clear All Filters
                                        </button>
                                    )}
                                </div>
                            )
                        )}
                    </main>
                </div>
            </div>

            {selectedJob && (
                <JobDetailModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                    appliedJobIds={appliedJobIds}
                    isSaved={savedJobIds.includes(String(selectedJob._id || selectedJob.id))}
                    onToggleSave={handleToggleSave}
                />
            )}
        </div>
    );
};

export default Jobs;
