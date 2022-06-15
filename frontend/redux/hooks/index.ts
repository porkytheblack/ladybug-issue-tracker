import { useSelector } from "react-redux"
import { TypedUseSelectorHook, useDispatch } from "react-redux"
import { RootState } from "../reducers"
import { AppDispatch } from "../Store"



export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector