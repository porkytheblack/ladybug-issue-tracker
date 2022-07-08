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
    const router = useRouter()
    const {user, loading_user, user_error} = userAuth()

    useEffect(()=>{
       
        if(loading_user || user_error) return ()=>{}
        if(isNull(user)){
            if(dashboard_routes.includes(pathname)){
                if(getUserAuthType == "unauthenticated"){
                    push("/auth").then(()=>{
                        localStorage.clear()
                        document.cookie = ""
                        setUserAuthType("unauthenticated")
                    })
                }
            }
        }
    }, [user, loading_user, user_error])

    

    
    
    if((!isUndefined(getUserAuthType) || isUndefined(getUserAuthType)) && getUserAuthType == "unauthenticated" && dashboard_routes.includes(pathname)){
        return (
            <div suppressHydrationWarning className="flex flex-col w-screen h-screen items-center justify-center">
                <Spin size="large" />
                <Text className='!text-black font-semibold text-xl mt-3 ' >
                    ladybug
                </Text>
            </div>
        )
    }else if(( !isUndefined(getUserAuthType) && getUserAuthType !== "unauthenticated") && pathname.indexOf("dashboard") !== -1  ){
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