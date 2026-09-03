import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

const initialState = {
    updateData: {
        name: "",
        email: "",
        phone: "",
        city: ""
    },
    loading: false,
    error: null,
    success: false
}

export const updateUser = createAsyncThunk(
    "update/updateUser",
    async (updateData, thunkApi) => {
        try {
            const response = await API.put("/update-profile", updateData)
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Failed To Update User"
            )
        }
    }
)

const updateUserSlice = createSlice({
    name: "update",

    initialState,

    reducers: {
        updateUserForm: (state, action) => {
            const { name, value } = action.payload;
            state.updateData[name] = value
        },
    }
})

export const { updateUserForm } = updateUserSlice.actions
export default updateUserSlice.reducer