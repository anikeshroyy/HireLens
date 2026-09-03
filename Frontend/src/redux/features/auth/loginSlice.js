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
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Can't get current user"
            )
        }
    }
)

export const updateUserProfile = createAsyncThunk(
    "currentUser/updateUserProfile",
    async (profileData, thunkApi) => {
        try {
            const response = await API.put("/auth/profile", profileData);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Failed to update profile"
            );
        }
    }
);

export const logoutUser = createAsyncThunk(
    "logout/logoutUser",
    async (_, thunkApi) => {
        try {
            const response = await API.post("/logout");
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Logout failed"
            )
        }
    }
)

const loginSlice = createSlice({
    name: "login",
    initialState,

    reducers: {
        updateLoginFormData: (state, action) => {
            const { name, value } = action.payload;
            state.formData[name] = value;
        },
        resetFormData: (state) => {
            state.formData = {
                email: "",
                password: "",
            };
        },
        resetProfileStatus: (state) => {
            state.error = null;
            state.success = false;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        });

        builder.addCase(getCurrentUser.pending, (state) => {
            state.authChecking = true;
            state.error = null;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.authChecking = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        });
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.authChecking = false;
            state.isAuthenticated = false;
            state.user = null;
        });

        builder.addCase(updateUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.user = action.payload.user;
        });
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        });

        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.success = false;
            state.error = null;
        });
    }
})

export const { updateLoginFormData, resetFormData, resetProfileStatus } = loginSlice.actions

export default loginSlice.reducer;