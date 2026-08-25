import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/loginSlice";
import { NavLink } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <main className="min-h-[85vh] bg-slate-100 px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-6xl">
        {user ? (
          <section className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-slate-800">
            {/* Header */}
            <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-600" />

            {/* Profile content */}
            <div className="-mt-16 flex flex-col items-center gap-6 px-6 pb-8 sm:px-10 lg:-mt-20 lg:flex-row lg:items-end lg:gap-10">
              {/* Avatar */}
              <div className="shrink-0">
                <img
                  src={user?.avatar}
                  alt={`${user?.name || "User"} profile`}
                  className="h-36 w-36 rounded-full border-4 border-white object-cover shadow-lg dark:border-slate-800 lg:h-40 lg:w-40"
                />
              </div>

              {/* User information */}
              <div className="w-full flex-1 text-center lg:text-left">
                <h1 className="text-2xl font-bold capitalize text-slate-900 dark:text-white lg:text-3xl">
                  {user?.name || "User"}
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 lg:text-base">
                  {user?.email || "No email available"}
                </p>

                {user?.role && (
                  <span className="mt-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium capitalize text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                    {user.role}
                  </span>
                )}
              </div>

              {/* Action */}
              <div className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 sm:w-auto cursor-pointer"
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full ml-4 rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 sm:w-auto cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200 dark:border-slate-700" />

            {/* Additional information */}
            <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 lg:p-8">
              <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Name
                </p>
                <p className="mt-1 font-medium capitalize text-slate-900 dark:text-white">
                  {user?.name || "Not available"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Email
                </p>
                <p className="mt-1 break-all font-medium text-slate-900 dark:text-white">
                  {user?.email || "Not available"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Role
                </p>
                <p className="mt-1 font-medium capitalize text-slate-900 dark:text-white">
                  {user?.role || "Not available"}
                </p>
              </div>
            </div>
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
    </main>
  );
};

export default UserDashboard;
