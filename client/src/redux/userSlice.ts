import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../types/types";


const userSlice = createSlice({
    name: "user",
    initialState: {
        key: "",
        id: null,
        role: "user",
        firstName: "",
        lastName: "",
        secondName: "",
        phone: "",
        mail: "",
        birthDay: "",
        login: "",
    },
    reducers: {
        setUser(state, action) {
            state = {...action.payload}
        }
    }
})

export default userSlice.reducer
export const {setUser} = userSlice.actions