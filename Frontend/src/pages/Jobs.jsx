import { useEffect } from "react";
import JobCard from "../components/jobs/JobCard";
import { getAllJobs } from "../redux/features/job/jobSlice";
import { useDispatch, useSelector } from "react-redux";

const Jobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  const { jobs } = useSelector((state) => state.allJobs);

  return (
    <div className="flex justify-center items-center flex-col bg-slate-200 dark:bg-slate-950">
      <div className="w-full min lg:max-w-6xl">
        <div className="flex flex-col items-center justify-center mt-20 px-10">
          <h2 className="text-2xl text-center font-semibold text-slate-900 dark:text-slate-100">
            Ready for your next opportunity?
          </h2>

          <p className="mt-2 max-w-md text-sm text-center leading-6 text-slate-500 dark:text-slate-400">
            Explore available jobs, find opportunities that match your skills,
            and start applying to your dream role.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center flex-wrap gap-5 mt-10 px-5 pb-10">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
