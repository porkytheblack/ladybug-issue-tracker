import React, { createContext, ReactNode, useState } from 'react'
import { useAppSelector } from '../redux/hooks'
import BaseLayout from './base_layout'
import DashboardLayout from './dashboard_layout'


function Layout({children}: {children: ReactNode | ReactNode[]}) {
    const authenticated = useAppSelector((state)=>state.user.authenticated)
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