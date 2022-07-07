import { useAtom } from 'jotai'
import { flatten } from 'lodash'
import React, { useEffect, useState } from 'react'
import { activeProjectAtom } from '../jotai/state'
import useProject from './useProject'
import useTeams from './useTeams'

function useTeam() {
    const [members, set_members] = useState<{
        user_name?: string,
        avatar?: string,
        _id: string
    }[]> ([])
    
    const [current_project, ] = useAtom(activeProjectAtom)
    const {project} = useProject()
    const {teams} = useTeams()

    useEffect(()=>{
        var m = teams.filter(({team_name})=>team_name == project.team).map((values)=>values.members)
       set_members(flatten(m))
    }, [,project, teams, current_project])
    

  return (
    {
        members
    }
  )
}

export default useTeam