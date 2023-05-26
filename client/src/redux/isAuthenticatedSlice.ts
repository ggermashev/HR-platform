import {createSlice} from "@reduxjs/toolkit";


const isAuthenticatedSlice = createSlice({
    name: "isAuthenticated",
    initialState: {
        auth: false
    },
    reducers: {
        setIsAuthenticated(state, action) {
            state.auth = action.payload
        }
    }
});

export default isAuthenticatedSlice.reducer
export const {setIsAuthenticated} = isAuthenticatedSlice.actions