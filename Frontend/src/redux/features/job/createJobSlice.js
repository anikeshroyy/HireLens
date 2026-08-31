import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../services/api";

const initialState = {
    jobData: {
        job_title: "",
        job_description: "",
        job_salary: "",
        job_employment_type: "",
        job_country: "",
        job_city: "",
        jobId: "",
        job_publisher: "",
        job_skills: [],
        employer_logo: "",
    },
    loading: false,
    error: null,
    success: false
}

export const createJobs = createAsyncThunk(
    "create/createJob",
    async (jobData, thunkApi) => {
        try {
            const result = await API.post("/create/job", jobData);
            return result.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.result?.data?.message || "Can't create Job"
            );
        }
    }
)

const createJobSlice = createSlice({
    name: "create",
    initialState,
    reducers: {
        updateJobData: (state, action) => {
            const { name, value } = action.payload
            state.jobData[name] = value
        },
        resetJobData: (state) => {
            state.jobData = {
                job_title: "",
                job_description: "",
                job_salary: "",
                job_employment_type: "",
                job_country: "",
                job_city: "",
                job_id: "",
                job_publisher: "",
                job_skills: [],
                employer_logo: "",
            }
        }
    },
})

export const { updateJobData, resetJobData } = createJobSlice.actions

export default createJobSlice.reducer