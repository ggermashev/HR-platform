import {createSlice} from "@reduxjs/toolkit";

const experiencesSlice = createSlice({
    name: "experiences",
    initialState: {
        values: [] as string[]
    },
    reducers: {
        setExperiences(state, action) {
            state.values = {...action.payload}
        }
    }

})

export default experiencesSlice.reducer
export const {setExperiences} = experiencesSlice.actions