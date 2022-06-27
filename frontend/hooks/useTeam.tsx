import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { activeProjectAtom } from '../jotai/state'
import useProject from './useProject'
import useTeams from './useTeams'

function useTeam() {
    const [members, set_members] = useState<{
        user_name?: string,
        avatar?: string
    }[]> ([])
    
    const [current_project, ] = useAtom(activeProjectAtom)
    const {project} = useProject()
    const {teams} = useTeams()

    useEffect(()=>{

        var members =  teams.filter(({team_name})=>team_name == project.team).map(({members})=>members)
        console.log(project)
        set_members(members as any)
    }, [,project])
    

  return (
    {
        members
    }
  )
}

export default useTeam