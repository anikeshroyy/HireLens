import { NavLink } from "react-router-dom";
import logo from "../assets/HireLens_Logo.png";

const Register = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div>
          <h1 className="text-slate-900 dark:text-slate-200 text-center text-2xl lg:text-3xl font-medium my-5">
            Create Account
          </h1>
          <div className="w-full lg:min-w-sm min-w-80 border border-slate-300 dark:border-slate-600 rounded-2xl p-5">
            <div className="flex flex-col items-center justify-center">
              <img src={logo} alt="" className="w-12 h-12" />
              <form action="" className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="name"
                  className="block text-slate-800 dark:text-slate-100"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter Your Full Name"
                  className="border border-blue-400 outline-none px-2 py-2 rounded-lg text-slate-700 dark:text-slate-100"
                />
                <label
                  htmlFor="email"
                  className="block text-slate-800 dark:text-slate-100"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter Your Email"
                  className="border border-blue-400 outline-none px-2 py-2 rounded-lg text-slate-700 dark:text-slate-100"
                />
                <label
                  htmlFor="email"
                  className="block text-slate-800 dark:text-slate-100"
                >
                  Register As
                </label>
                <select
                  name=""
                  id=""
                  className="border border-blue-400 outline-none px-2 py-2 rounded-lg text-slate-700 dark:text-slate-100"
                >
                  <option
                    value=""
                    className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                  >
                    Job Sicker
                  </option>
                  <option
                    value=""
                    className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                  >
                    Recruiter
                  </option>
                </select>
                <label
                  htmlFor="password"
                  className="block text-slate-800 dark:text-slate-100"
                >
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  placeholder="Enter Your Password"
                  className="border border-blue-400 outline-none px-2 py-2 rounded-lg text-slate-700 dark:text-slate-100"
                />

                <button className="bg-blue-500 dark:text-slate-200 text-slate-200 font-medium py-2 rounded-lg cursor-pointer">
                  Create Account
                </button>
              </form>

              <div className="w-full flex flex-col items-center justify-center">
                <div className="border border-slate-500 mt-5 w-full"></div>
                <div className="-mt-3.75 bg-slate-100 dark:bg-slate-950 px-2">
                  <h1 className="dark:text-slate-200 text-slate-700">
                    Have an Account?
                  </h1>
                </div>
              </div>
              <NavLink
                to="/login"
                className="bg-slate-500 w-full text-center mt-3 dark:text-slate-200 text-slate-200 font-medium py-2 rounded-lg cursor-pointer"
              >
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
