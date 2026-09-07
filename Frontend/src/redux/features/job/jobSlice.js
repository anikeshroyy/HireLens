import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../services/api";

const initialState = {
    jobs: [],
    jobsByRecruiter: [],
    appliedJobs: [],
    savedJobs: [],
    adzunaJobs: [],
    loading: false,
    adzunaLoading: false,
    applyLoading: false,
    applySuccess: false,
    saveLoading: false,
    updateSuccess: false,
    error: null,
    applyError: null,
};

export const getAllJobs = createAsyncThunk("jobs/alljobs", async (_, thunkApi) => {
    try {
        const res = await API.get("/jobs");
        return res.data;
    } catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "Failed to fetch jobs");
    }
});

export const myJobs = createAsyncThunk("jobs/myJobs", async (_, thunkApi) => {
    try {
        const res = await API.get("/jobs/my-jobs");
        return res.data;
    } catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "Failed to fetch your jobs");
    }
});

export const getAdzunaJobs = createAsyncThunk("jobs/getAdzunaJobs", async (params = {}, thunkApi) => {
    try {
        const res = await API.get("/jobs/adzuna", { params });
        return res.data;
    } catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "Failed to fetch Adzuna jobs");
    }
});

export const updateJob = createAsyncThunk("jobs/updateJob", async ({ jobId, jobData }, thunkApi) => {
    try {
        const res = await API.put(`/jobs/edit/${jobId}`, jobData);
        return res.data;
    } catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "Failed to update job");
    }
});

export const deleteJob = createAsyncThunk("jobs/deleteJob", async (jobId, thunkApi) => {
    try {
        await API.delete(`/jobs/${jobId}`);
        return jobId;
    } catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "Failed to delete job");
    }
});

export const applyToJob = createAsyncThunk("jobs/applyToJob", async (jobId, thunkApi) => {
    try {
        const res = await API.post(`/jobs/${jobId}/apply`);
        return { jobId, message: res.data.message };
    } catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "Failed to apply");
    }
});

export const getAppliedJobs = createAsyncThunk("jobs/getAppliedJobs", async (_, thunkApi) => {
    try {
        const res = await API.get("/jobs/applied");
        return res.data;
    } catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "Failed to fetch applied jobs");
    }
});

export const getSavedJobs = createAsyncThunk("jobs/getSavedJobs", async (_, thunkApi) => {
    try {
        const res = await API.get("/jobs/saved");
        return res.data;
    } catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "Failed to fetch saved jobs");
    }
});

export const toggleSaveJob = createAsyncThunk("jobs/toggleSaveJob", async ({ jobId, jobData }, thunkApi) => {
    try {
        const res = await API.post(`/jobs/${jobId}/save`, { jobData });
        return res.data;
    } catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "Failed to toggle save job");
    }
});

const setLoading = (state) => { state.loading = true; state.error = null; };
const setError = (state, action) => { state.loading = false; state.error = action.payload; };

const jobSlice = createSlice({
    name: "jobs",
    initialState,

    reducers: {
        resetJobUpdateStatus: (state) => {
            state.updateSuccess = false;
            state.error = null;
        },
        resetApplyStatus: (state) => {
            state.applySuccess = false;
            state.applyError = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllJobs.pending, setLoading)
            .addCase(getAllJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(getAllJobs.rejected, setError)

            .addCase(myJobs.pending, setLoading)
            .addCase(myJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobsByRecruiter = action.payload;
            })
            .addCase(myJobs.rejected, setError)

            .addCase(getAdzunaJobs.pending, (state) => { state.adzunaLoading = true; })
            .addCase(getAdzunaJobs.fulfilled, (state, action) => {
                state.adzunaLoading = false;
                state.adzunaJobs = action.payload;
            })
            .addCase(getAdzunaJobs.rejected, (state, action) => {
                state.adzunaLoading = false;
                state.error = action.payload;
            })

            .addCase(updateJob.pending, (state) => {
                state.loading = true;
                state.updateSuccess = false;
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                state.loading = false;
                state.updateSuccess = true;
                const updated = action.payload;
                state.jobsByRecruiter = state.jobsByRecruiter.map(j => j._id === updated._id ? updated : j);
                state.jobs = state.jobs.map(j => j._id === updated._id ? updated : j);
            })
            .addCase(updateJob.rejected, (state, action) => {
                state.loading = false;
                state.updateSuccess = false;
                state.error = action.payload;
            })

            .addCase(deleteJob.pending, setLoading)
            .addCase(deleteJob.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.payload;
                state.jobs = state.jobs.filter(j => j._id !== id);
                state.jobsByRecruiter = state.jobsByRecruiter.filter(j => j._id !== id);
            })
            .addCase(deleteJob.rejected, setError)

            .addCase(applyToJob.pending, (state) => {
                state.applyLoading = true;
                state.applySuccess = false;
                state.applyError = null;
            })
            .addCase(applyToJob.fulfilled, (state, action) => {
                state.applyLoading = false;
                state.applySuccess = true;
                if (action.payload?.jobId) {
                    const id = String(action.payload.jobId);
                    if (!state.appliedJobs.some(j => String(j._id || j.id) === id)) {
                        state.appliedJobs.push({ _id: id });
                    }
                }
            })
            .addCase(applyToJob.rejected, (state, action) => {
                state.applyLoading = false;
                state.applyError = action.payload;
            })

            .addCase(getAppliedJobs.pending, setLoading)
            .addCase(getAppliedJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.appliedJobs = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getAppliedJobs.rejected, setError)

            .addCase(getSavedJobs.fulfilled, (state, action) => {
                state.savedJobs = Array.isArray(action.payload) ? action.payload : [];
            })

            .addCase(toggleSaveJob.pending, (state) => {
                state.saveLoading = true;
            })
            .addCase(toggleSaveJob.fulfilled, (state, action) => {
                state.saveLoading = false;
                const { saved, jobId, savedJobs } = action.payload;
                if (savedJobs && Array.isArray(savedJobs)) {
                    state.savedJobs = savedJobs;
                } else if (saved) {
                    if (!state.savedJobs.some(s => s.jobId === String(jobId))) {
                        state.savedJobs.push({ jobId: String(jobId) });
                    }
                } else {
                    state.savedJobs = state.savedJobs.filter(s => s.jobId !== String(jobId));
                }
            })
            .addCase(toggleSaveJob.rejected, (state, action) => {
                state.saveLoading = false;
                state.error = action.payload;
            });
    },
});

export const { resetJobUpdateStatus, resetApplyStatus } = jobSlice.actions;
export default jobSlice.reducer;