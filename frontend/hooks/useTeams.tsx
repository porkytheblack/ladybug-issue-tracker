import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { backend_url } from '../globals'
import { TeamSchema } from '../globaltypes'

function useTeams () {
    const [teams, set_teams] = useState<TeamSchema[]>([])
    const [team_names, set_team_names] = useState<string[]>([])
    const team_query = useQuery(["teams"], ()=>axios.get(`${backend_url}/teams`, {withCredentials: true}).then(({data})=>data as TeamSchema[]))
    useEffect(()=>{
        if(team_query.isLoading) ()=>{}
        if(team_query.isError) () =>{}
        if(typeof team_query.data == "undefined" || team_query.data == null) return ()=>{}
        set_teams(team_query.data)
        set_team_names(team_query.data.map(({team_name})=>team_name as string))
    }, [,team_query.isLoading, team_query.isError, team_query.data])
    return ({
        teams,
        team_names
    }
  )
}

export default useTeams