import {combineReducers, configureStore, createSlice, createStore} from "@reduxjs/toolkit";
import activeChatSlice from "./activeChatSlice";
import activeTestSlice from "./activeTestSlice";
import userSlice from "./userSlice";
import citiesSlice from "./citiesSlice";
import experiencesSlice from "./experiencesSlice";
import professionsSlice from "./professionsSlice";
import skillsSlice from "./skillsSlice";


const rootReducer = combineReducers({
    activeChat: activeChatSlice,
    activeTest: activeTestSlice,
    user: userSlice,
    cities: citiesSlice,
    experiences: experiencesSlice,
    professions: professionsSlice,
    skills: skillsSlice,
})

export const store = configureStore({
    reducer: rootReducer
    }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
