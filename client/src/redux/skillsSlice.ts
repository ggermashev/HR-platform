import {createSlice} from "@reduxjs/toolkit";


const skillsSlice = createSlice({
    name: "skills",
    initialState: {
        values: []
    },
    reducers: {
        setSkills(state, action) {
            state = {...action.payload}
        }
    }
})

export default skillsSlice.reducer
export const {setSkills} = skillsSlice.actions