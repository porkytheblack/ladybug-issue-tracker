import { useRouter } from 'next/router'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import BaseModalContainer from '../components/Containers/BaseModalContainer'
import { project_type } from '../components/DataDisplay/Projects/ProjectCard'
import SideMenu from './Navigation/Dashboard/SideMenu'

export type active_type = "dashboard" | "teams" | "inbox" | "projects" | "user" | "project_sub"
export type active_sub = "settings" |  "overview" | "issues" | "activity" | "sprints" | "teams" | "workflows" | "none"


export interface DashboardContextInterface {
  expanded: boolean,
  toggle_menu?: ()=>void,
  active: active_type,
  change_active?: (a: active_type )=>void,
  active_sub: active_sub,
  current_project_type?: project_type
}

export const DashboardContext = createContext<DashboardContextInterface>({expanded: false, active: "dashboard", active_sub: "none"}) 


function DashboardLayout({children}: {children: ReactNode | ReactNode[]}) {
  const [expanded, set_expanded] = useState<boolean>(false) 
  const [active, set_active] = useState<active_type>("dashboard")
  const [active_sub, set_active_sub] = useState<active_sub>("none")
  const [project_type, set_project_type] = useState<project_type|undefined>(undefined) 
  const toggle_menu = () =>{
    set_expanded(!expanded)
  }
  const change_active = (t: active_type) =>{
    set_active(t)
  }
  const {pathname, isReady, query, basePath} = useRouter()

  useEffect(()=>{
    console.log(pathname)
    if(pathname == "/dashboard/teams"){
      set_active("teams")
    }else if(pathname == "/dashboard/inbox"){
      set_active("inbox")
    }else if(pathname == "/user"){
      set_active("user")
    }else if(pathname.indexOf("/dashboard/projects/") != -1 && pathname.length > "/dashboard/projects/".length) {
      set_active("project_sub")
      var n = pathname.replace("/dashboard/projects/", "")
      n = ["overview", "issues", "settings", "activity" , "sprints"].indexOf(n) !== -1 ? n : "none"
      set_active_sub(n as active_sub)
    }else if(pathname.indexOf("/dashboard/settings/") !== -1 && pathname.length > "/dashboard/settings/".length){
      set_active("teams")
      var n = pathname.replace("/dashboard/teams/", "")
      n = ["teams", "workflows"].indexOf(n) !== -1 ? n : "none"
      set_active_sub(n as active_sub)
    }else if(pathname == "/dashboard/projects"){
      set_active("projects")
      set_active_sub("none")
    }

  }, [, pathname, isReady])

  return (
    <DashboardContext.Provider value={{expanded, toggle_menu, active, change_active, active_sub,  current_project_type: project_type}} >
      <DashboardLayoutContainer className=" !bg-[#F2F5FA] flex flex-row items-start justify-start w-screen relative h-screen overflow-x-hidden overflow-y-hidden" >
          <SideMenu/>
          <div className="w-full flex flex-col items-center justify-start h-full" >
          {children}
          </div>
          
      </DashboardLayoutContainer>
      
    </DashboardContext.Provider>
  )
}

export default DashboardLayout

const DashboardLayoutContainer = styled.div`
  .child-container {
    overflow-y: scroll;
    &::-webkit-scrollbar{
      background: transparent;
      width: 5px;
    }
    &::-webkit-scrollbar-thumb{
      border-radius: 2.5px;
      background: #b3d4fc;
    }
  }
`