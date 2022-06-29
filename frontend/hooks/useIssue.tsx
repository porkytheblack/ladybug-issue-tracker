import axios from 'axios'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { backend_url } from '../globals'
import { IssueInterface } from '../globaltypes'
import { activeIssueAtom } from '../jotai/state'
import useIssues from './useIssues'

function useIssue() {
    const [issue, set_issue] = useState<IssueInterface>()
    const [current_issue, ] = useAtom(activeIssueAtom)
    const {issues} = useIssues()
    const issue_query = useQuery(["issue", current_issue], ()=>axios.get(`${backend_url}/issue/${current_issue}`, {withCredentials: true}).then(({data})=>data), {
      initialData: []
    })
    const {isLoading, isError, data} = issue_query
    useEffect(()=>{
      if(isLoading || isError || data == null || typeof data == "undefined") return ()=>{ }
      set_issue(data[0] as IssueInterface)
      console.log(issue)
    }, [,isLoading, isError, data])

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
        _id: issue?._id
    }
  )
}

export default useIssue