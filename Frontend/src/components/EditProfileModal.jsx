import { X } from "lucide-react";
import {
  updateUser,
  updateUserForm,
} from "../redux/features/auth/updateUserSlice";
import { useDispatch, useSelector } from "react-redux";

const EditProfileModal = ({ onClose }) => {
  const { updateData } = useSelector((state) => state.updateUser);
  const { user } = useSelector((state) => state.login);
  console.log(updateData);
  console.log(user);

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await dispatch(updateUser(updateData));
    if (updateUser.fulfilled.match(result)) {
      console.log("User Updated");
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(updateUserForm({ name, value }));
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen">
        <div className="lg:w-3xl w-80  px-5 py-5 bg-indigo-600 shadow-slate-600 shadow-sm lg:rounded-3xl rounded-2xl">
          <div className="flex items-center justify-between mb-5">
            <h1 className="font-medium text-2xl text-slate-200 dark:text-slate-200">
              Upadte Your Profile
            </h1>
            <button
              onClick={onClose}
              className="cursor-pointer active:scale-95 text-slate-200"
            >
              <X size={28} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-200 text-xl">Basic Information</h1>
            <div className="flex lg:flex-row flex-col gap-2 lg:gap-20">
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-slate-200">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={
                        updateData.name || user?.name || ""
                      }
                  onChange={handleInput}
                  placeholder="Enter Your Full Name"
                  className="border border-slate-400 outline-none px-2 py-1 rounded-lg text-slate-100 bg-slate-700"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-slate-200">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={updateData.email || user?.email || ""}
                  onChange={handleInput}
                  disabled
                  placeholder="Enter Your Email"
                  className="border border-slate-400 outline-none px-2 py-1 rounded-lg text-slate-100 bg-slate-700"
                />
              </div>
            </div>
            <div className="flex lg:flex-row flex-col gap-2 lg:gap-20">
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-slate-200">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={updateData.phone || user?.phone || ""}
                  onChange={handleInput}
                  placeholder="Enter Your Phone Number"
                  className="border w-full border-slate-400 outline-none px-2 py-1 rounded-lg text-slate-100 bg-slate-700"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-slate-200">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={updateData.city || user?.city || ""}
                  onChange={handleInput}
                  placeholder="Enter Your City"
                  className="border w-full border-slate-400 outline-none px-2 py-1 rounded-lg text-slate-100 bg-slate-700"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="bg-red-500 cursor-pointer text-slate-800 font-medium active:scale-95 hover:bg-red-700 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSubmit();
                }}
                className="bg-green-600 cursor-pointer text-slate-800 font-medium active:scale-95 px-6 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
