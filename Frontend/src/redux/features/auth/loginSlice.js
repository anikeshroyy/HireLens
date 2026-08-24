import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import API from '../../../services/api'

const initialState = {
    formData: {
        email: "",
        password: "",
    },
    error: null,
    loading: false,
    success: false,
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
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true,
                state.error = null,
                state.success = false
        })

        builder.addCase(loginUser.fulfilled, (state) => {
            state.loading = false,
                state.success = true
        })

        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false,
                state.error = action.payload
        })
    }
})

export const { updateLoginFormData, resetFormData } = loginSlice.actions

export default loginSlice.reducer;