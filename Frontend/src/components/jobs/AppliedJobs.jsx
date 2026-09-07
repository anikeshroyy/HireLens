import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAppliedJobs } from "../../redux/features/job/jobSlice";
import JobDetailModal from "./JobDetailModal";

const AppliedJobs = () => {
    const dispatch = useDispatch();
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        dispatch(getAppliedJobs());
    }, [dispatch]);

    const { appliedJobs, loading } = useSelector((state) => state.allJobs);
    const appliedJobIds = appliedJobs.map((j) => j._id);

    if (loading) {
        return (
            <div className="flex items-center justify-center my-10">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
            </div>
        );
    }

    if (appliedJobs.length === 0) {
        return (
            <div className="flex items-center justify-center my-5">
                <div className="my-10 w-full lg:max-w-5xl max-w-75">
                    <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-sm border border-slate-200 dark:border-slate-800 dark:bg-slate-900">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl dark:bg-blue-950">
                            💼
                        </div>
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                            Ready for your next opportunity?
                        </h2>
                        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Explore available jobs, find opportunities that match your skills, and start applying to your dream role.
                        </p>
                        <NavLink
                            to="/jobs"
                            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 active:scale-95"
                        >
                            Explore Jobs →
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
                    Applied Jobs
                </h1>
                <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                    Tracking {appliedJobs.length} application{appliedJobs.length !== 1 ? "s" : ""}.
                </p>

                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="hidden grid-cols-4 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300 md:grid">
                        <span>Job Title</span>
                        <span>Location</span>
                        <span>Employment</span>
                        <span className="text-right">Action</span>
                    </div>

                    <div>
                        {appliedJobs.map((job) => (
                            <div
                                key={job._id}
                                className="grid grid-cols-1 gap-3 border-b border-slate-200 px-6 py-5 last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40 md:grid-cols-4 md:items-center md:gap-4"
                            >
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                                        {job.job_title}
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                                        {job.job_publisher}
                                    </p>
                                </div>

                                <div className="text-sm text-slate-600 dark:text-slate-300">
                                    {job.job_city}, {job.job_country}
                                </div>

                                <div>
                                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                        {job.job_employment_type}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 md:justify-end">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-950/40 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
                                        ✓ Applied
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedJob(job)}
                                        className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedJob && (
                <JobDetailModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                    appliedJobIds={appliedJobIds}
                />
            )}
        </div>
    );
};

export default AppliedJobs;
