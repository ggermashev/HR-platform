import {createSlice} from "@reduxjs/toolkit";


const activeTestSlice = createSlice({
    name: "activeTest",
    initialState: {
        id: -1
    },
    reducers: {
        setTestId(state, action) {
            state.id = action.payload
        }
    }
});

export default activeTestSlice.reducer
export const {setTestId} = activeTestSlice.actions