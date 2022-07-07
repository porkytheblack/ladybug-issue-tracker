import { useAuth0 } from '@auth0/auth0-react'
import { Spin } from 'antd'
import { useAtom } from 'jotai'
import { isEmpty, isNull, isUndefined } from 'lodash'
import { useRouter } from 'next/router'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { dashboard_routes } from '../globals'
import {  is_def_string } from '../helpers'
import userAuth from '../hooks/userAuth'
import { userAtom, userAuthTypeAtom } from '../jotai/state'
import { Text } from '../pages/_app'
import { authenticate_user, deauthenticate_user } from '../redux/actions/user.actions'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import BaseLayout from './base_layout'
import DashboardLayout from './dashboard_layout'


function Layout({children}: {children: ReactNode | ReactNode[]}) {
    const [getUserAuthType, setUserAuthType ] =  useAtom(userAuthTypeAtom)
    const {push, pathname, } = useRouter()
    const {user, loading_auth} = userAuth()

    useEffect(()=>{
        console.log(user)
        if(isNull(user)){
            if(dashboard_routes.includes(pathname)){
                push("/auth").then(()=>{
                    localStorage.clear()
                    document.cookie = ""
                })
            }
        }
    }, [, user])

    useEffect(()=>{
        console.log(pathname)
    }, [,pathname])

    
    
    


    if(( !isUndefined(getUserAuthType) && getUserAuthType !== "unauthenticated") && pathname.indexOf("dashboard") !== -1  ){
        return (
            <DashboardLayout>
                {children}
            </DashboardLayout>
        )
    }else if(( isUndefined(getUserAuthType) || getUserAuthType == "unauthenticated") && pathname.indexOf("dashboard") == -1){
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