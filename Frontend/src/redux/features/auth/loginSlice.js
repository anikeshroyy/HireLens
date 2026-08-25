import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import API from '../../../services/api'

const initialState = {
    formData: {
        email: "",
        password: "",
    },
    error: null,
    loading: false,
    authChecking: false,
    success: false,
    isAuthenticated: false,
    user: null,
}

export const loginUser = createAsyncThunk(
    "login/loginUser",
    async (formData, thunkApi) => {
        try {
            const response = await API.post("/login/user", formData)
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Login Failed"
            )
        }
    }
)

export const getCurrentUser = createAsyncThunk(
    "currentUser/getCurrentUser",
    async (_, thunkApi) => {
        try {
            const response = await API.get("/auth/me");
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Can't get current user"
            )
        }
    }
)

export const logoutUser = createAsyncThunk(
    "logout/logoutUser",
    async (_, thunkApi) => {
        try {
            const response = await API.post("/logout");
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Can't get current user"
            )
        }
    }
)

const loginSlice = createSlice({
    name: "login",

    initialState,

    reducers: {
        updateLoginFormData: (state, action) => {
            const { name, value } = action.payload
            state.formData[name] = value
        },
        resetFormData: (state) => {
            state.formData = {
                email: "",
                password: "",
            }
        }
    },

    extraReducers: (builder) => {

        // LogIn User Checking
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true,
                state.error = null,
                state.success = false
        })

        // LogIn User Completed
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false,
                state.success = true,
                state.isAuthenticated = true,
                state.user = action.payload.user
        })

        // LogIn Failed
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false,
                state.success = false,
                state.error = action.payload,
                state.isAuthenticated = false,
                state.user = null
        })

        // Existing session checking
        builder.addCase(
            getCurrentUser.pending,
            (state) => {
                state.authChecking = true;
                state.error = null;
            });

        // Existing session found
        builder.addCase(
            getCurrentUser.fulfilled,
            (state, action) => {
                state.authChecking = false;

                state.isAuthenticated = true;
                state.user = action.payload.user;
            });

        // No valid session
        builder.addCase(
            getCurrentUser.rejected,
            (state) => {
                state.authChecking = false;

                state.isAuthenticated = false;
                state.user = null;
            });

        // LogOut Completed
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.success = false;
            state.error = null;
        });
    }
})

export const { updateLoginFormData, resetFormData } = loginSlice.actions

export default loginSlice.reducer;