export const update_awesomeness_type: string = "update [awesomeness]"
export const authenticate = "authenticate"
export const deauthenticate = "deauthenticate"

//state interface
export interface authInitialState {
    authenticated: boolean,
    user: null | {
        user_name: string,
        user_email: string
    }
}

export interface manage_user_auth {
    type: typeof authenticate | typeof deauthenticate,
    payload?: boolean | {
        user_name: string,
        user_email: string
    }
}

export type user_management_types = manage_user_auth

