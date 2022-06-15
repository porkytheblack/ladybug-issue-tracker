import { authInitialState, user_management_types } from "../types";

const userState: authInitialState = {
    authenticated: false,
    user: null
}

export function user_reducer(state: authInitialState = userState, action: user_management_types): authInitialState{
    switch(action.type){
        case "authenticate":
            return {
                authenticated: true,
                user: typeof action.payload !== "undefined" && typeof action.payload !== "boolean" ? action.payload : null
            }
        case "deauthenticate":
            return {
                authenticated: false,
                user: null
            }
        default:
            return userState
    }
}