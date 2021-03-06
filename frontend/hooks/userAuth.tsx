import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useAtom } from 'jotai'
import { isNull } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { backend_url } from '../globals'
import { refreshToken, tick_up_user, userAuthTypeAtom, user_tick } from '../jotai/state'

function userAuth() {
    const [authType, setAuthType] = useAtom(userAuthTypeAtom)
    const [refresh_token,] = useAtom(refreshToken)
    const [tick, ] = useAtom(user_tick)
    const [,up] = useAtom(tick_up_user)
    const [user, set_user] = useState<{
        user_name: string,
        email: string,
        first_name: string,
        avatar: string,
        last_name: string,
    }|null>(null)
    
    const backend_auth_query = useQuery([refresh_token, "refresh_token_fetch"], ()=>refresh_token == "" ? null : axios.post(`${backend_url}/token`, {
        token: refresh_token
    }).then(({data})=>data), {
        refetchInterval: 60 * 5 *1000,
        enabled: authType !== "unauthenticated"
    })
    const user_query = useQuery([refresh_token, "user", tick], ()=> refresh_token == "" ? null : axios.get(`${backend_url}/user`, {
        withCredentials: true
    }).then(({data})=>data), {
        initialData: null,
        enabled: authType !== "unauthenticated"
    })
    const {isLoading, isError, data} = backend_auth_query
    const {push} = useRouter()
    // const {user, isAuthenticated, isLoading} = useAuth0()

    useEffect(()=>{

        if(!isLoading){
            if(isError){
                push("/auth").then(()=>{
                    document.cookie = ""
                    localStorage.clear()
                    setAuthType("unauthenticated")
                })
            }
        }
    }, [,isLoading, isError, refreshToken])

    // useEffect(()=>{
    //     console.log(user)
    //     if(isNull(user_query.data) || user_query.isLoading || user_query.isError) return ()=>{}
    //     set_user(user_query.data)
    // }, [,tick])
    

  return (
    {
        loading_auth: isLoading,
        user: user_query.data,
        up,
        loading_user: user_query.isLoading,
        user_error: user_query.isError,
        error: user_query.error
    }
  )
}

export default userAuth