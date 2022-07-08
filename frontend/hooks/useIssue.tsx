import axios from 'axios'
import { useAtom } from 'jotai'
import { isString } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { backend_url } from '../globals'
import { IssueInterface } from '../globaltypes'
import { activeIssueAtom, LeftModalVisibility, tick_issue, userAuthTypeAtom } from '../jotai/state'
import useIssues from './useIssues'

function useIssue() {
    const [authType, setAuthType] = useAtom(userAuthTypeAtom)
    const [leftModal, ] = useAtom(LeftModalVisibility)
    const [tick, ] = useAtom(tick_issue)
    const [issue, set_issue] = useState<IssueInterface>()
    const [current_issue, ] = useAtom(activeIssueAtom)
    const {issues} = useIssues()
    const issue_query = useQuery(["issue", current_issue, tick], ()=>axios.get(`${backend_url}/issue/${current_issue}`, {withCredentials: true}).then(({data})=>data), {
      initialData: [],
      enabled: authType !== "unauthenticated" && isString(current_issue)
    })
    const {isLoading, isError, data, error} = issue_query
    useEffect(()=>{
      if(isLoading || isError || data == null || typeof data == "undefined") return ()=>{ }
      set_issue(data[0] as IssueInterface)
    }, [,isLoading, isError, data, leftModal, data.length, current_issue])

  return (
    {
        creator: typeof issue?.assignees !== "undefined" ? issue?.assignees[0] : null,
        description: issue?.description,
        summary: issue?.summary,
        severity: issue?.severity,
        status: issue?.status,
        type: issue?.type,
        tags: issue?.tags,
        comments: issue?.comments,
        assignees: issue?.assignees,
        _id: issue?._id,
        loading: isLoading,
        is_error: isError,
        system_details: issue?.system_details,
        attachments: issue?.attachments
    }
  )
}

export default useIssue