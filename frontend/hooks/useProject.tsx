import axios from 'axios'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { backend_url } from '../globals'
import { projectInterface } from '../globaltypes'
import { activeProjectAtom } from '../jotai/state'

function useProject() {
  const [project, set_project] = useState<projectInterface>({})
  const [current_project, ] = useAtom(activeProjectAtom)
  const project_query = useQuery([current_project, "project"], ()=>axios.get(`${backend_url}/project/${current_project}`, {
    withCredentials: true
  }).then(({data})=>data as projectInterface))

  useEffect(()=>{
    if(project_query.isLoading || project_query.isError || project_query.data == null || typeof project_query.data == "undefined") return ()=> {}
    set_project(project_query.data)
  }, [,project_query.isLoading, project_query.isError, project_query.data])

  return (
    {
      project,
      is_loading: project_query.isLoading,
      is_error: project_query.isError,
      name: project.project_name,
      project_team: project.team,
      platform: project.platform,
      _id: project._id
    }
  )
}

export default useProject