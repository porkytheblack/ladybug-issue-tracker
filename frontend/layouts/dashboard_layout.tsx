import React, { createContext, ReactNode, useState } from 'react'
import styled from 'styled-components'
import SideMenu from './Navigation/Dashboard/SideMenu'

export interface DashboardContextInterface {
  expanded: boolean,
  toggle_menu?: ()=>void,
  active: "dashboard" | "settings" | "inbox" | "projects" | "user",
  change_active?: (a: "dashboard" | "settings" | "inbox" | "projects" | "user" )=>void
}

export const DashboardContext = createContext<DashboardContextInterface>({expanded: false, active: "dashboard"}) 


function DashboardLayout({children}: {children: ReactNode | ReactNode[]}) {
  const [expanded, set_expanded] = useState<boolean>(false) 
  const [active, set_active] = useState<"dashboard"| "settings" | "inbox" | "projects" | "user">("dashboard")
  const toggle_menu = () =>{
    set_expanded(!expanded)
  }
  const change_active = (t: "dashboard" | "settings" | "inbox" | "projects" | "user") =>{
    set_active(t)
  }
  return (
    <DashboardContext.Provider value={{expanded, toggle_menu, active, change_active}} >
      <DashboardLayoutContainer className=" !bg-[#F2F5FA] flex flex-row items-start justify-start w-screen h-screen overflow-x-hidden overflow-y-hidden" >
          <SideMenu/>
          {children}
      </DashboardLayoutContainer>
    </DashboardContext.Provider>
  )
}

export default DashboardLayout

const DashboardLayoutContainer = styled.div`

`