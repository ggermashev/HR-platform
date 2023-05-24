import {createSlice} from "@reduxjs/toolkit";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        values: []
    },
    reducers: {
        setProfessions(state, action) {
            state = {...action.payload}
        }
    }
})

export default professionsSlice.reducer
export const {setProfessions} = professionsSlice.actions