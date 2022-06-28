import React, { useEffect, useState } from 'react'
import { IssueInterface } from '../globaltypes'
import useProject from './useProject'

function useIssues() {
    const {project} = useProject()
    const [issues, set_issues] = useState<IssueInterface[]>([])
    useEffect(()=>{
        if( typeof project.issues == "undefined")  return ()=>{}
        set_issues(project.issues as IssueInterface[])
        console.log(project.issues)
    }, [,project, project.issues])
  return (
    {
        issues,
        total_issues: issues.length,
        new_issues: issues.filter(({status})=> status == "new").length,
        closed_issues: issues.filter(({status})=> status == "closed").length,
        ongoing_issues: issues.filter(({status})=>status !== "new" && status !== "closed").length
    }
  )
}

export default useIssues