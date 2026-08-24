import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import authApi from '../../../services/api'

const initialState = {
    formData: {
        name: "",
        email: "",
        role: "jobseeker",
        password: "",
    },
    loading: false,
    error: null,
    success: false
}

export const registerUser = createAsyncThunk(
    "register/registerUser",

    async (formData, thunkApi) => {
        try {
            const response = await authApi.post(
                "/create/user",
                formData
            );

            return response.data;

        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    }
);

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        updateformData: (state, action) => {
            const { name, value } = action.payload;
            state.formData[name] = value
        },

        resetForm: (state) => {
            state.formData = {
                name: "",
                email: "",
                role: "jobseeker",
                password: "",
            }
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})


export const { updateformData, resetForm } = registerSlice.actions

export default registerSlice.reducer