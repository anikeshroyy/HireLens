import { NavLink } from "react-router-dom";
import logo from "../assets/HireLens_Logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  updateLoginFormData,
  resetFormData,
} from "../redux/features/auth/loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { formData, error, loading, success } = useSelector(
    (state) => state.login,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {
      dispatch(resetFormData());
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(updateLoginFormData({ name, value }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div>
          <h1 className="text-slate-900 dark:text-slate-200 text-center text-2xl lg:text-3xl font-medium my-5">
            Login to Hirelens
          </h1>
          <div className="w-full lg:min-w-sm min-w-80 border border-slate-300 dark:border-slate-800 bg-slate-200 dark:bg-slate-900 rounded-2xl p-5">
            <div className="flex flex-col items-center justify-center">
              <img src={logo} alt="" className="w-12 h-12" />
              <form
                action=""
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 w-full"
              >
                <label
                  htmlFor="email"
                  className="block text-slate-800 dark:text-slate-100"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInput}
                  placeholder="Enter Your Email"
                  className="border border-blue-400 outline-none px-2 py-2 rounded-lg text-slate-700 dark:text-slate-100"
                />
                <label
                  htmlFor="password"
                  className="block text-slate-800 dark:text-slate-100"
                >
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInput}
                  placeholder="Enter Your Password"
                  className="border border-blue-400 outline-none px-2 py-2 rounded-lg text-slate-700 dark:text-slate-100"
                />

                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">Login Success</p>}

                <button
                  disabled={loading}
                  className="bg-blue-500 dark:text-slate-200 text-slate-200 font-medium py-2 rounded-lg cursor-pointer"
                >
                  {loading ? "Logging in..." : "Login Now"}
                </button>
              </form>

              <div className="w-full flex flex-col items-center justify-center">
                <div className="border border-slate-500 mt-5 w-full"></div>
                <div className="-mt-3.75 bg-slate-200 dark:bg-slate-900 px-2">
                  <h1 className="dark:text-slate-200 text-slate-700">
                    New Here?
                  </h1>
                </div>
              </div>
              <NavLink
                to="/register"
                className="bg-slate-500 w-full text-center mt-3 dark:text-slate-200 text-slate-200 font-medium py-2 rounded-lg cursor-pointer"
              >
                Create Account
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
