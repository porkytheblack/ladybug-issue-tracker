import { atom, useAtom, useAtomValue } from "jotai";
import {atomWithStorage} from "jotai/utils"

export interface userInterface {
    user_name: string,
    user_email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

export type user_auth_type = "auth0" | "normal" | "unauthenticated"

export const userAtom = atomWithStorage<userInterface|null>("user", null)

export const userAuthTypeAtom = atomWithStorage<user_auth_type>("user_auth_type", "unauthenticated")

export const activeProjectAtom = atomWithStorage<string | null>("current_project", null)




