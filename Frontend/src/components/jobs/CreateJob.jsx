import { useDispatch, useSelector } from "react-redux";
import {
  updateJobData,
  resetJobData,
  createJobs,
} from "../../redux/features/job/createJobSlice";

import { NavLink, useNavigate } from "react-router-dom";

const CreateJob = () => {
  const inputStyle =
    "w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200";

  const labelStyle =
    "mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobData } = useSelector((state) => state.createJobs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(createJobs(jobData));
    if (createJobs.fulfilled.match(result)) {
      dispatch(resetJobData());
      navigate("/dashboard");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    dispatch(
      updateJobData({
        name,
        value,
      }),
    );
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Create a Job
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Add a new job opportunity and find the right candidate.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <form action="" onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Basic Information
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Provide the basic details about the position.
                </p>
              </div>

              {/* Job Title */}
              <div>
                <label htmlFor="job_title" className={labelStyle}>
                  Job Title <span className="text-red-500">*</span>
                </label>

                <input
                  id="job_title"
                  type="text"
                  name="job_title"
                  value={jobData.job_title}
                  onChange={handleInput}
                  placeholder="e.g. MERN Stack Developer"
                  className={inputStyle}
                />
              </div>

              {/* Publisher + Job ID */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="job_publisher" className={labelStyle}>
                    Company / Job Publisher{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="job_publisher"
                    name="job_publisher"
                    value={jobData.job_publisher}
                    onChange={handleInput}
                    type="text"
                    placeholder="e.g. Infosys"
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="jobId" className={labelStyle}>
                    Job ID <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="jobId"
                    name="jobId"
                    value={jobData.jobId}
                    onChange={handleInput}
                    type="text"
                    placeholder="e.g. JOB-001"
                    className={inputStyle}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="job_description" className={labelStyle}>
                  Job Description <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="job_description"
                  name="job_description"
                  value={jobData.job_description}
                  onChange={handleInput}
                  rows="4"
                  placeholder="Describe the role, responsibilities and requirements..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                />
              </div>

              {/* Location */}
              <div>
                <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Location
                </h2>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="job_country" className={labelStyle}>
                      Country <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="job_country"
                      name="job_country"
                      value={jobData.job_country}
                      onChange={handleInput}
                      type="text"
                      placeholder="e.g. India"
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor="job_city" className={labelStyle}>
                      City <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="job_city"
                      name="job_city"
                      value={jobData.job_city}
                      onChange={handleInput}
                      type="text"
                      placeholder="e.g. Bangalore"
                      className={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Employment Details */}
              <div>
                <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Employment Details
                </h2>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="job_employment_type" className={labelStyle}>
                      Employment Type <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="job_employment_type"
                      name="job_employment_type"
                      value={jobData.job_employment_type}
                      onChange={handleInput}
                      className={inputStyle}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select employment type
                      </option>

                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="job_salary" className={labelStyle}>
                      Salary <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="job_salary"
                      name="job_salary"
                      value={jobData.job_salary}
                      onChange={handleInput}
                      type="text"
                      placeholder="e.g. ₹6 - ₹10 LPA"
                      className={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <label htmlFor="skills" className={labelStyle}>
                  Required Skills <span className="text-red-500">*</span>
                </label>

                <input
                  id="skills"
                  name="job_skills"
                  value={jobData.job_skills}
                  onChange={handleInput}
                  type="text"
                  placeholder="e.g. React.js, Node.js, MongoDB, Express.js"
                  className={inputStyle}
                />

                <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                  Separate multiple skills using commas.
                </p>
              </div>

              {/* Logo */}
              <div>
                <label htmlFor="employer_logo" className={labelStyle}>
                  Company Logo URL
                </label>

                <input
                  id="employer_logo"
                  name="employer_logo"
                  value={jobData.employer_logo}
                  onChange={handleInput}
                  type="url"
                  placeholder="https://example.com/logo.png"
                  className={inputStyle}
                />

                <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                  Optional. Provide a publicly accessible image URL.
                </p>
              </div>

              {/* Submit */}
              <div className="border-t border-slate-200 pt-6 dark:border-slate-800">
                <div className="flex gap-5 justify-between">
                  <NavLink
                    to="/dashboard"
                    className="w-full rounded-lg bg-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 active:scale-[0.99] sm:w-auto"
                  >
                    Cancel
                  </NavLink>
                  <button className="w-full cursor-pointer rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99] sm:w-auto">
                    Create Job
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
