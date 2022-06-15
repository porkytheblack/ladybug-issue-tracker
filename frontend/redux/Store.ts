import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import { rootReducer } from "./reducers"


export const store = configureStore({
    reducer: rootReducer
})
const makeStore = () => store

export type AppDispatch = typeof store.dispatch
export const wrapper = createWrapper(makeStore)

//that was easy 😁