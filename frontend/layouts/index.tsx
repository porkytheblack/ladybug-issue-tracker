import { useAuth0 } from '@auth0/auth0-react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import {  is_def_string } from '../helpers'
import { userAtom, userAuthTypeAtom } from '../jotai/state'
import { authenticate_user, deauthenticate_user } from '../redux/actions/user.actions'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import BaseLayout from './base_layout'
import DashboardLayout from './dashboard_layout'


function Layout({children}: {children: ReactNode | ReactNode[]}) {
    const [getUserAuthType, setUserAuthType ] =  useAtom(userAuthTypeAtom)
    const authenticated = useAppSelector((state)=>state.user.authenticated)
    const [user_atom, set_user_atom] = useAtom(userAtom)
    const {isAuthenticated, user} = useAuth0()
    const {push, pathname} = useRouter()
    const [access_token, set_access_token] = useCookies(["access_token"])
    
    useEffect(()=>{
        if(typeof access_token.access_token !== "string") return ()=>{}
        if(access_token.access_token.length == 0) return ()=>{}
        if(getUserAuthType == "unauthenticated"  || getUserAuthType == "auth0"){
            if(isAuthenticated){
                console.log("Authenticate")
                if(typeof user !== "undefined"){
                    if(user_atom == null){
                        if(user){
                            set_user_atom({
                                user_email: typeof user.email !== "undefined" ? user.email : "" ,
                                user_name: typeof user.nickname !== "undefined" ? user.nickname : "",
                                first_name: is_def_string(user.given_name),
                                last_name: is_def_string(user.family_name),
                                avatar: is_def_string(user.picture)
                            })
                            push("/dashboard")
                            setUserAuthType("auth0")
                        }
                    }            
                }
            }
        }

        if(user_atom !== null && getUserAuthType == "normal" ){
            push("/dashboard")
        }
        if(user_atom == null && getUserAuthType == "unauthenticated" ){
            push("/auth")
        }
        if(access_token.access_token == ""){
            set_user_atom(null)
            setUserAuthType("unauthenticated")
            push("/auth")
        }
    }, [,isAuthenticated, user, user_atom, getUserAuthType])

    console.log(isAuthenticated, user)


    if(getUserAuthType !== "unauthenticated" && pathname.indexOf("dashboard") !== -1 ){
        return (
            <DashboardLayout>
                {children}
            </DashboardLayout>
        )
    }else if(getUserAuthType == "unauthenticated" && pathname.indexOf("dashboard") == -1){
        return (
            <BaseLayout>
                {children}
            </BaseLayout>
        )
    }else{
        return (
            <div>
                {children}
            </div>
        )
    }

   
}

export default Layout