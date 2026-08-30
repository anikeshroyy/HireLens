import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../../../services/api";

const initialState = {
    jobs: [],
    loading: false,
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

const jobSlice = createSlice({
    name: "jobs",
    initialState,

    reducers: {
    },

    extraReducers: (builder) => {
        builder.addCase(getAllJobs.pending, (state) => {
            state.loading = true;
            state.error = null;
        }),

            builder.addCase(getAllJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.jobs = action.payload;
            }),

            builder.addCase(getAllJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default jobSlice.reducer