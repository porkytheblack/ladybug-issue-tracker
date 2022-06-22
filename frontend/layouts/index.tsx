import { useAuth0 } from '@auth0/auth0-react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
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
    
    useEffect(()=>{

        if(getUserAuthType == "unauthenticated"  || getUserAuthType == "auth0"){
            if(isAuthenticated){
                console.log("Authenticate")
                if(typeof user !== "undefined"){
                    if(user_atom == null){
                        console.log("No user in storage")
                        if(user){
                            console.log("Here I am")
                            set_user_atom({
                                user_email: typeof user.email !== "undefined" ? user.email : "" ,
                                user_name: typeof user.nickname !== "undefined" ? user.nickname : "",
                                first_name: is_def_string(user.given_name),
                                last_name: is_def_string(user.family_name)
                            })
                            push("/dashboard")
                            setUserAuthType("auth0")
                        }
                    }            
                }
            }
        }

        
        
    }, [,isAuthenticated, user])

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