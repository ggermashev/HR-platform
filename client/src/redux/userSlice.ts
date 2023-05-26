import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../types/types";


const userSlice = createSlice({
    name: "user",
    initialState: {
        id: null,
        role: "",
        firstName: "",
        lastName: "",
        login: "",
    },
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id
            state.role = action.payload.role
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.login = action.payload.login
        },
        clearUser(state) {
            state.id = null
            state.role = ""
            state.firstName = ""
            state.lastName = ""
            state.login = ""
        }
    }
})

export default userSlice.reducer
export const {setUser, clearUser} = userSlice.actions