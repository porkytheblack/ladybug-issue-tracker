import React, { useEffect, useState } from 'react'
import { extCommentInterface, IssueInterface } from '../globaltypes'
import useProject from './useProject'
import _ from "lodash"
import { is_def_string } from '../helpers'

function useIssues() {
    const {project} = useProject()
    const [issues, set_issues] = useState<IssueInterface[]>([])
    const [comments, set_comments] = useState<extCommentInterface[]>()

    useEffect(()=>{
        if( typeof project.issues == "undefined")  return ()=>{}
        set_issues(project.issues as IssueInterface[])
    }, [,project, project.issues, project?.issues?.length])

    useEffect(()=>{
        console.log(issues)
        var n = issues.map(({comments, summary, _id})=>comments.map((comment)=>({...comment, summary, issue_id: _id})) )
        var m = _.flatten(n)
        m = _.sortBy(m, [function(comment){
            return new Date(is_def_string(comment.lastModified))
        }])
        m = _.reverse(m)
        set_comments(m)

    }, [,project, project.issues, project?.issues?.length, issues.length, issues])


  return (
    {
        issues,
        total_issues: issues.length,
        new_issues: issues.filter(({status})=> status == "new").length,
        closed_issues: issues.filter(({status})=> status == "closed").length,
        ongoing_issues: issues.filter(({status})=>status !== "new" && status !== "closed").length,
        comments
    }
  )
}

export default useIssues