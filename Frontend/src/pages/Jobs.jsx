import { useEffect } from "react";
import JobCard from "../components/JobCard";
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
      <div className="w-full min-h-screen lg:max-w-6xl">
        <h1 className="text-center text-4xl font-bold pt-20 text-slate-800 dark:text-slate-200">
          This is all the jobs
        </h1>
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
