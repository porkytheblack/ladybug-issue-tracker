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

export const activeIssueAtom = atomWithStorage<string | null>("current_issue", null)

export const LeftModalVisibility = atom<boolean>(false)

export const issue_fetch_tick  = atom<number>(0)
export const team_fetch_tick = atom<number>(0)
export const project_fetch_tick = atom<number>(0)

export const tick_up = atom(null, (get, set, _)=>{set(issue_fetch_tick, get(issue_fetch_tick)+1)})
export const tick_up_team = atom(null, (get, set, _)=>{set(team_fetch_tick, get(team_fetch_tick)+1)})
export const tick_up_project = atom(null, (get, set, _)=>{set(project_fetch_tick, get(project_fetch_tick)+1)})

export const tick_issue = atom<number>(0)
export const tick_up_issue = atom(null, (get, set, _)=>{set(tick_issue, get(tick_issue)+1)})





