import axios from 'axios'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { projectInterface } from '../globaltypes'
import { project_fetch_tick, userAuthTypeAtom } from '../jotai/state'

function useProjects(): {
    projects: projectInterface[],
    loading: boolean,
    is_error: boolean,
    error: any,
    len?: number
} {
    const [tick, ] = useAtom(project_fetch_tick)
    const [authType, setAuthType] = useAtom(userAuthTypeAtom)
    const [projects, set_projects] = useState<projectInterface[]>([])
    const projects_query = useQuery(["projects", tick], ()=>axios.get("http://localhost:8080/projects", {withCredentials: true}).then(({data})=>data as projectInterface[]), {
      enabled: authType !== "unauthenticated"
    })
    useEffect(()=>{
        if(projects_query.isError || projects_query.isLoading) return ()=>{}
        if(projects_query.data == null || typeof projects_query.data == "undefined") return ()=>{}
        set_projects(projects_query.data)
    }, [, projects_query.isLoading, projects_query.isError, projects_query.data?.length, tick])
  return (
    {
        projects,
        loading: projects_query.isLoading,
        is_error: projects_query.isError,
        error: projects_query.error,
        len: projects_query.data?.length
    }
  )
}

export default useProjects