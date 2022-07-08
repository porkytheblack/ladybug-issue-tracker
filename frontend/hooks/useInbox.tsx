import axios from 'axios'
import { useAtom } from 'jotai'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { backend_url } from '../globals'
import { InboxSchema } from '../globaltypes'
import { inbox_tick, userAuthTypeAtom } from '../jotai/state'

function useInbox() {
    const [authType, setAuthType] = useAtom(userAuthTypeAtom)
    const [tick, ] = useAtom(inbox_tick)
    const [inbox, set_inbox] = useState<InboxSchema[]>([])
    const inbox_query = useQuery(["inbox", tick], ()=>axios.get(`${backend_url}/inbox`, {
        withCredentials: true
    }).then(({data})=>data), {
        initialData: [],
        enabled: authType !== "unauthenticated"
    })
    const {isError, isLoading, data} = inbox_query
    useEffect(()=>{ 
        if(isError || isLoading ||data == null || _.isUndefined(data)) return ()=>{}
        set_inbox(data)
    }, [,inbox_query.isError, inbox_query.isLoading, inbox_query.data])

    

    return (
        {
            unread_messages: _.reverse(_.sortBy(inbox.filter(({read})=> !read).filter(({type}) => type == "message"), [(inbox)=>inbox.createdAt])),
            unread_invites: _.reverse(_.sortBy(inbox.filter(({read})=> !read).filter(({type}) => type == "invite"), [(inbox)=>inbox.createdAt])),
            read_messages: _.reverse(_.sortBy(inbox.filter(({read})=> read).filter(({type}) => type == "message"), [(inbox)=>inbox.createdAt])),
            read_invites: _.reverse(_.sortBy(inbox.filter(({read})=> read).filter(({type}) => type == "invite"), [(inbox)=>inbox.createdAt])),
            all: inbox,
            total_messages: inbox.length
        }
    )
}

export default useInbox