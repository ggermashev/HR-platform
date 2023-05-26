import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../types/types";


const userSlice = createSlice({
    name: "user",
    initialState: {
        id: -1,
        role: "",
        firstName: "",
        lastName: "",
        login: "",
        isAuth: false
    },
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id
            state.role = action.payload.role
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.login = action.payload.login
            state.isAuth = true
        },
        clearUser(state) {
            state.id = -1
            state.role = ""
            state.firstName = ""
            state.lastName = ""
            state.login = ""
            state.isAuth = false
        }
    }
})

export default userSlice.reducer
export const {setUser, clearUser} = userSlice.actions