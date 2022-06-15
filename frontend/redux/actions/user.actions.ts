import { ActionCreator } from "redux";
import { user_management_types, authenticate, deauthenticate } from "../types";


export const authenticate_user: ActionCreator<user_management_types> = (payload?: boolean | {user_name: string , user_email: string})=>{
    return {
        type: authenticate,
        payload
    }
}

export const deauthenticate_user: ActionCreator<user_management_types> = (payload?: boolean )=>{
    return {
        type: deauthenticate,
        payload
    }
}