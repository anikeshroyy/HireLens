import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateJob, resetJobUpdateStatus } from "../../redux/features/job/jobSlice";

const EditJobModal = ({ isOpen, onClose, jobToEdit }) => {
  const dispatch = useDispatch();
  const { loading, error, updateSuccess } = useSelector((state) => state.allJobs);

  const [formData, setFormData] = useState({
    job_title: "",
    job_publisher: "",
    jobId: "",
    job_description: "",
    job_country: "",
    job_city: "",
    job_employment_type: "Full-time",
    job_salary: "",
    skills: "",
    employer_logo: "",
  });

  useEffect(() => {
    if (jobToEdit && isOpen) {
      setFormData({
        job_title: jobToEdit.job_title || "",
        job_publisher: jobToEdit.job_publisher || "",
        jobId: jobToEdit.jobId || "",
        job_description: jobToEdit.job_description || "",
        job_country: jobToEdit.job_country || "",
        job_city: jobToEdit.job_city || "",
        job_employment_type: jobToEdit.job_employment_type || "Full-time",
        job_salary: jobToEdit.job_salary || "",
        skills: Array.isArray(jobToEdit.skills)
          ? jobToEdit.skills.join(", ")
          : jobToEdit.skills || "",
        employer_logo: jobToEdit.employer_logo || "",
      });
    }
  }, [jobToEdit, isOpen]);

  useEffect(() => {
    if (updateSuccess && isOpen) {
      const timer = setTimeout(() => {
        handleClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [updateSuccess, isOpen]);

  if (!isOpen || !jobToEdit) return null;

  const handleClose = () => {
    dispatch(resetJobUpdateStatus());
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateJob({ jobId: jobToEdit._id, jobData: formData }));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const inputStyle =
    "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-400";

  const labelStyle =
    "block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs transition-opacity duration-200"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 sm:p-8 border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Edit Job Listing
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Update position details, requirements, and salary.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-white transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Notifications */}
        {error && (
          <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}
        {updateSuccess && (
          <div className="mt-4 rounded-xl bg-green-50 p-4 text-sm text-green-600 dark:bg-green-950/40 dark:text-green-300 border border-green-200 dark:border-green-800">
            Job listing updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Job Title */}
          <div>
            <label className={labelStyle}>Job Title *</label>
            <input
              type="text"
              name="job_title"
              required
              value={formData.job_title}
              onChange={handleChange}
              placeholder="e.g. Senior MERN Stack Developer"
              className={inputStyle}
            />
          </div>

          {/* Publisher & Job ID */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelStyle}>Company / Publisher *</label>
              <input
                type="text"
                name="job_publisher"
                required
                value={formData.job_publisher}
                onChange={handleChange}
                placeholder="e.g. Acme Corp"
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Job ID *</label>
              <input
                type="text"
                name="jobId"
                required
                value={formData.jobId}
                onChange={handleChange}
                placeholder="e.g. JOB-101"
                className={inputStyle}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelStyle}>Job Description *</label>
            <textarea
              name="job_description"
              rows={4}
              required
              value={formData.job_description}
              onChange={handleChange}
              placeholder="Describe position responsibilities and requirements..."
              className={inputStyle}
            />
          </div>

          {/* Location Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelStyle}>City *</label>
              <input
                type="text"
                name="job_city"
                required
                value={formData.job_city}
                onChange={handleChange}
                placeholder="e.g. Pune"
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Country *</label>
              <input
                type="text"
                name="job_country"
                required
                value={formData.job_country}
                onChange={handleChange}
                placeholder="e.g. India"
                className={inputStyle}
              />
            </div>
          </div>

          {/* Employment & Salary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelStyle}>Employment Type *</label>
              <select
                name="job_employment_type"
                value={formData.job_employment_type}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <div>
              <label className={labelStyle}>Salary Range</label>
              <input
                type="text"
                name="job_salary"
                value={formData.job_salary}
                onChange={handleChange}
                placeholder="e.g. ₹8 - ₹12 LPA"
                className={inputStyle}
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className={labelStyle}>Required Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. React.js, Node.js, MongoDB, Express"
              className={inputStyle}
            />
          </div>

          {/* Logo URL */}
          <div>
            <label className={labelStyle}>Company Logo URL</label>
            <input
              type="url"
              name="employer_logo"
              value={formData.employer_logo}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
              className={inputStyle}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-md hover:bg-indigo-700 active:scale-95 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  Saving...
                </>
              ) : (
                "Update Job"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;
