import {createSlice} from "@reduxjs/toolkit";


const activeChatSlice = createSlice({
    name: "activeChat",
    initialState: {
        id: -1
    },
    reducers: {
        setChatId(state, action) {
            state.id = action.payload
        }
    }
});

export default activeChatSlice.reducer
export const {setChatId} = activeChatSlice.actions

