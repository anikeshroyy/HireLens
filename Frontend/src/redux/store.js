import { configureStore } from "@reduxjs/toolkit"
import registerReducer from "./features/auth/registerSlice"
import loginReducer from "./features/auth/loginSlice"
import allJobReducer from "./features/job/jobSlice"
import createJobReducer from "./features/job/createJobSlice"
import resumeReducer from "./features/resume/resumeSlice"

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        allJobs: allJobReducer,
        createJobs: createJobReducer,
        resume: resumeReducer,
    }
})

export default store