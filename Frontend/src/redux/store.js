import { configureStore } from "@reduxjs/toolkit"
import registerReducer from "./features/auth/registerSlice"
import loginReducer from "./features/auth/loginSlice"
import allJobReducer from "./features/job/jobSlice"

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        allJobs: allJobReducer
    }
})

export default store