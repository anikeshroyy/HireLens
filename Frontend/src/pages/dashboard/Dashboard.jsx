import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/features/auth/loginSlice";
import { NavLink } from "react-router-dom";
import AppliedJobs from "../../components/jobs/AppliedJobs";
import PostedJobs from "../../components/jobs/PostedJobs";

import { myJobs } from "../../redux/features/job/jobSlice";
import { useEffect, useState } from "react";

import EditProfileModal from "../../components/profile/EditProfileModal";

import Button from "../../components/common/Button";

const Dashboard = () => {
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (user?.role === "recruiter") {
      dispatch(myJobs());
    }
  }, [dispatch, user?.role]);

  const { jobsByRecruiter } = useSelector((state) => state.allJobs);

  const [openModal, setOpenModal] = useState(false);

  return (
    <main className="min-h-[85vh] bg-slate-100 px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-6xl">
        {user ? (
          <section className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-slate-800">
            {/* Header */}
            <div className="h-32 bg-linear-to-r from-pink-600 to-indigo-600" />

            {/* Profile content */}
            <div className="-mt-19 flex flex-col items-center gap-6 px-6 pb-8 sm:px-10 lg:-mt-21 lg:flex-row lg:items-center lg:gap-10">
              {/* Avatar */}
              <div className="shrink-0">
                <img
                  src={user?.avatar}
                  alt={`${user?.name || "User"} profile`}
                  className="h-36 w-36 rounded-full border-2 border-slate-400 object-cover shadow-lg dark:border-slate-200 lg:h-40 lg:w-40"
                />
              </div>

              {/* User information */}
              <div className="w-full flex-1 text-center lg:text-left">
                <h1 className="text-2xl font-bold capitalize lg:text-slate-200 dark:text-white lg:text-3xl">
                  {user?.name || "User"}
                </h1>

                <p className="lg:-mt-2 lg:mb-3 text-sm lg:text-slate-300 dark:text-slate-300 lg:text-base">
                  {user?.email || "No email available"}
                </p>

                {user?.role && (
                  <span className="mt-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium capitalize text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                    {user.role}
                  </span>
                )}
              </div>

              {/* Action */}
              <div className="w-full sm:w-auto flex lg:flex-row flex-col gap-3">
                {jobsByRecruiter.length > 0 && (
                  <NavLink to="/createJobs" className="w-full sm:w-auto">
                    <Button variant="success" className="w-full sm:w-auto">
                      Create Jobs
                    </Button>
                  </NavLink>
                )}

                <Button
                  variant="primary"
                  onClick={() => setOpenModal(true)}
                  className="w-full sm:w-auto"
                >
                  Edit Profile
                </Button>

                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="w-full sm:w-auto"
                >
                  Logout
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200 dark:border-slate-700" />

            <section>
              {user.role === "jobseeker" ? <AppliedJobs /> : <PostedJobs />}
            </section>
          </section>
        ) : (
          <section className="flex min-h-100 flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-xl dark:bg-slate-800">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl dark:bg-blue-900/40">
              🔒
            </div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Login Required
            </h1>

            <p className="mt-2 max-w-md text-slate-500 dark:text-slate-400">
              Please log in to view your dashboard and manage your profile.
            </p>

            <NavLink
              to="/login"
              className="mt-6 rounded-lg active:scale-95 bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 cursor-pointer"
            >
              Login
            </NavLink>
          </section>
        )}
      </div>
      <EditProfileModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </main>
  );
};

export default Dashboard;
