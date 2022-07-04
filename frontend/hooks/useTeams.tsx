import axios from 'axios'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { backend_url } from '../globals'
import { TeamSchema } from '../globaltypes'
import { team_fetch_tick } from '../jotai/state'

function useTeams () {
    const [tick, ] = useAtom(team_fetch_tick)
    const [teams, set_teams] = useState<TeamSchema[]>([])
    const [team_names, set_team_names] = useState<string[]>([])
    const team_query = useQuery(["teams", tick], ()=>axios.get(`${backend_url}/teams`, {withCredentials: true}).then(({data})=>data as TeamSchema[]))
    useEffect(()=>{
        if(team_query.isLoading) ()=>{}
        if(team_query.isError) () =>{}
        if(typeof team_query.data == "undefined" || team_query.data == null) return ()=>{}
        set_teams(team_query.data)
        set_team_names(team_query.data.map(({team_name})=>team_name as string))

    }, [,team_query.isLoading, team_query.isError, team_query.data?.length])
    return ({
        teams,
        team_names,
        teams_plus_ids: teams.map(({team_name, _id})=>({team_name, _id}))
    }
  )
}

export default useTeams