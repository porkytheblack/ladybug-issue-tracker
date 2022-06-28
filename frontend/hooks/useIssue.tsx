import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { IssueInterface } from '../globaltypes'
import { activeIssueAtom } from '../jotai/state'
import useIssues from './useIssues'

function useIssue() {
    const [issue, set_issue] = useState<IssueInterface>()
    const [current_issue, ] = useAtom(activeIssueAtom)
    const {issues} = useIssues()

    useEffect(()=>{
        var cur_issue = issues.filter(({_id})=>_id == current_issue)
        console.log(cur_issue)
        set_issue(cur_issue[0])
    }, [,issues, current_issue])

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