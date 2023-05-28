import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../types/types";
import jwt_decode from "jwt-decode";


const token = localStorage.getItem('token')
let user = {id: -1, role: "", firstName: "", lastName: "", login: "", isAuth: false}
if (token) {
    user = jwt_decode(token)
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: user.id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        login: user.login,
        isAuth: false,
        phone: ""
    },
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id
            state.role = action.payload.role
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.login = action.payload.login
            state.phone = action.payload.phone
            state.isAuth = true
        },
        clearUser(state) {
            state.id = -1
            state.role = ""
            state.firstName = ""
            state.lastName = ""
            state.login = ""
            state.phone = ""
            state.isAuth = false
        },
        setIsAuth(state, action) {
            state.isAuth = action.payload
        }
    }
})

export default userSlice.reducer
export const {setUser, clearUser, setIsAuth} = userSlice.actions