import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ML_API_URL = import.meta.env.VITE_ML_API_URL;

export const parseResume = createAsyncThunk(
    "resume/parseResume",
    async (file, thunkApi) => {
        try {
            const formData = new FormData();
            formData.append("resume", file);

            const response = await axios.post(ML_API_URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            return response.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Failed to parse resume"
            );
        }
    }
);

const resumeSlice = createSlice({
    name: "resume",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },

    reducers: {
        clearResume: (state) => {
            state.data = null;
            state.error = null;
            state.loading = false;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(parseResume.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.data = null;
        });
        builder.addCase(parseResume.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(parseResume.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearResume } = resumeSlice.actions;
export default resumeSlice.reducer;
