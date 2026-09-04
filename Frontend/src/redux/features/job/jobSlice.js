import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../../../services/api";

const initialState = {
    jobs: [],
    jobsByRecruiter: [],
    adzunaJobs: [],
    loading: false,
    adzunaLoading: false,
    error: null,
}

export const getAllJobs = createAsyncThunk("jobs/alljobs", async (_, thunkApi) => {
    try {
        const result = await API.get("/jobs")
        return result.data;
    } catch (err) {
        return thunkApi.rejectWithValue(
            err.result?.data?.message || "Jobs can't fetched"
        )
    }
})

export const myJobs = createAsyncThunk("jobs/myJobs", async (_, thunkApi) => {
    try {
        const result = await API.get("/jobs/my-jobs")
        return result.data
    } catch (error) {
        return thunkApi.rejectWithValue(
            error.result?.data?.message || "Can't fetched job for recruiter"
        )
    }
})

export const getAdzunaJobs = createAsyncThunk(
    "jobs/getAdzunaJobs",
    async (params = {}, thunkApi) => {
        try {
            const response = await API.get("/jobs/adzuna", { params });
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Failed to fetch Adzuna jobs"
            );
        }
    }
);

export const updateJob = createAsyncThunk(
    "jobs/updateJob",
    async ({ jobId, jobData }, thunkApi) => {
        try {
            const response = await API.put(`/jobs/edit/${jobId}`, jobData);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Failed to update job"
            );
        }
    }
);

const jobSlice = createSlice({
    name: "jobs",
    initialState,

    reducers: {
        resetJobUpdateStatus: (state) => {
            state.updateSuccess = false;
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getAllJobs.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getAllJobs.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.jobs = action.payload;
        });

        builder.addCase(getAllJobs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(myJobs.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(myJobs.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.jobsByRecruiter = action.payload;
        });

        builder.addCase(myJobs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(getAdzunaJobs.pending, (state) => {
            state.adzunaLoading = true;
            state.error = null;
        });

        builder.addCase(getAdzunaJobs.fulfilled, (state, action) => {
            state.adzunaLoading = false;
            state.adzunaJobs = action.payload;
        });

        builder.addCase(getAdzunaJobs.rejected, (state, action) => {
            state.adzunaLoading = false;
            state.error = action.payload;
        });

        builder.addCase(updateJob.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.updateSuccess = false;
        });

        builder.addCase(updateJob.fulfilled, (state, action) => {
            state.loading = false;
            state.updateSuccess = true;
            const updated = action.payload;
            state.jobsByRecruiter = state.jobsByRecruiter.map((job) =>
                job._id === updated._id ? updated : job
            );
            state.jobs = state.jobs.map((job) =>
                job._id === updated._id ? updated : job
            );
        });

        builder.addCase(updateJob.rejected, (state, action) => {
            state.loading = false;
            state.updateSuccess = false;
            state.error = action.payload;
        });
    }
})

export const { resetJobUpdateStatus } = jobSlice.actions;

export default jobSlice.reducer