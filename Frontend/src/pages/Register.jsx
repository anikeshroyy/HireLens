import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/HireLens_Logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  updateformData,
  resetForm,
} from "../redux/features/auth/registerSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { formData, error, loading, success } = useSelector(
    (state) => state.register,
  );

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(registerUser(formData));

    if (registerUser.fulfilled.match(result)) {
      dispatch(resetForm());

      navigate("/login");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    dispatch(
      updateformData({
        name,
        value,
      }),
    );
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div>
          <h1 className="text-slate-900 dark:text-slate-200 text-center text-2xl lg:text-3xl font-medium my-5">
            Create Account
          </h1>
          <div className="w-full lg:min-w-sm min-w-80 border border-slate-300 dark:border-slate-800 dark:bg-slate-900 bg-slate-200 rounded-2xl p-5">
            <div className="flex flex-col items-center justify-center">
              <img src={logo} alt="" className="w-12 h-12" />
              <form
                action=""
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 w-full"
              >
                <label
                  htmlFor="name"
                  className="block text-slate-800 dark:text-slate-100"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInput}
                  autoComplete="off"
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
                  type="email"
                  id="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInput}
                  placeholder="Enter Your Email"
                  className="border border-blue-400 outline-none px-2 py-2 rounded-lg text-slate-700 dark:text-slate-100"
                />
                <label
                  htmlFor="role"
                  className="block text-slate-800 dark:text-slate-100"
                >
                  Register As
                </label>
                <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleInput}
                  className="border border-blue-400 outline-none px-2 py-2 rounded-lg text-slate-700 dark:text-slate-100"
                >
                  <option
                    value="jobseeker"
                    className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                  >
                    Job Seeker
                  </option>
                  <option
                    value="recruiter"
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
                  type="password"
                  id="password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleInput}
                  placeholder="Enter Your Password"
                  className="border border-blue-400 outline-none px-2 py-2 rounded-lg text-slate-700 dark:text-slate-100"
                />

                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}

                <button
                  className="bg-blue-500 dark:text-slate-200 text-slate-200 font-medium py-2 rounded-lg cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Creating Account ... " : "Create Account"}
                </button>
              </form>

              <div className="w-full flex flex-col items-center justify-center">
                <div className="border border-slate-500 mt-5 w-full"></div>
                <div className="-mt-3.75 dark:bg-slate-900 bg-slate-200 px-2">
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
