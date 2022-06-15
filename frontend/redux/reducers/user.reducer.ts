import { authInitialState, user_management_types } from "../types";

const userState: authInitialState = {
    //- authenticated: false,
    authenticated: true, //+ for testing
    // user: null
    user: { // for testing
        user_email: "don@email.com",
        user_name: "don"
    }
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