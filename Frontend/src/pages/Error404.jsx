import { NavLink } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="min-h-[92vh] flex items-center justify-center">
      <div className="text-center">
        <div className="flex flex-col gap-5 p-5">
          <h1 className="text-6xl">👻</h1>
          <h1 className="lg:text-4xl text-3xl dark:text-slate-200 text-slate-900 font-bold mb-5">
            Oops! This page doesn't exist.
          </h1>
        </div>

        <NavLink to="/" className="bg-blue-500 px-5 py-2 text-white rounded">
          Go Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default Error404;
