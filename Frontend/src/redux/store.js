import { configureStore } from "@reduxjs/toolkit"
import registerReducer from "./features/auth/registerSlice"
import loginReducer from "./features/auth/loginSlice"
import allJobReducer from "./features/job/jobSlice"
import createJobReducer from "./features/job/createJobSlice"
import updateUserReducer from "./features/auth/updateUserSlice"

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        allJobs: allJobReducer,
        createJobs: createJobReducer,
        updateUser: updateUserReducer,
    }
})

export default store