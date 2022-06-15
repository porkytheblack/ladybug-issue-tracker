import { useAuth0 } from '@auth0/auth0-react'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { authenticate_user, deauthenticate_user } from '../redux/actions/user.actions'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import BaseLayout from './base_layout'
import DashboardLayout from './dashboard_layout'


function Layout({children}: {children: ReactNode | ReactNode[]}) {
    const authenticated = useAppSelector((state)=>state.user.authenticated)
    const {isAuthenticated, user} = useAuth0()
    const dispatch = useAppDispatch()
    // useEffect(()=>{
    //     if(isAuthenticated){
    //         dispatch(authenticate_user({
    //             user_name: user?.name,
    //             user_email: user?.email
    //         }))
    //     }else{
    //         dispatch(deauthenticate_user())
    //     }
    // }, [isAuthenticated])
    if(authenticated){
        return (
            <DashboardLayout>
                {children}
            </DashboardLayout>
        )
    }else if(!authenticated){
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