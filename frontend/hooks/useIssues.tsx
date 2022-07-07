import React, { useEffect, useState } from 'react'
import { extCommentInterface, IssueInterface } from '../globaltypes'
import useProject from './useProject'
import _ from "lodash"
import { is_def_string } from '../helpers'
import { useQuery } from 'react-query'
import axios from 'axios'
import { backend_url } from '../globals'
import { useAtom } from 'jotai'
import { activeIssueAtom, activeProjectAtom, issue_fetch_tick, tick_up, userAtom } from '../jotai/state'
import { generateRandomColor } from '../helpers/randomColor'
import { useRouter } from 'next/router'

function useIssues() {
    const [tick, ] = useAtom(issue_fetch_tick)
    const {project, _id} = useProject()
    const [issues, set_issues] = useState<IssueInterface[]>([])
    const [comments, set_comments] = useState<extCommentInterface[]>()
    const issues_query = useQuery(["issues", tick, _id], ()=>axios.get(`${backend_url}/issues`, {withCredentials: true}).then(({data})=>data))
    const {pathname} = useRouter()
    const [current_project, ] = useAtom(activeProjectAtom) 
    const [user,] = useAtom(userAtom)
    const [current_issue, set_current_issue] = useState(activeIssueAtom)

    const [, up] = useAtom(tick_up)

    useEffect(()=>{
        if(issues_query.isError || issues_query.isLoading || typeof issues_query.data == "undefined" || issues_query.data == null)  return ()=>{}
        var is;
        if(pathname.includes("projects/")){
            is = _.flatten(issues_query.data.filter((proj: any)=>proj?._id == current_project ).map((proj: any)=>Object.values(proj?.issues)))
            is = _.remove(is, (_is: any)=>_is.assignees.map(({user_name}: {user_name: string})=>user_name).includes(user?.user_name))
            console.log(is)
            is = _.reverse(_.sortBy(is, [({updatedAt}: {updatedAt: Date})=>new Date(updatedAt)]))
            set_issues(is as IssueInterface[])
        }else{
            is = _.flatten(issues_query.data.map((proj: any)=>Object.values(proj?.issues)))
            is = _.remove(is, (_is: any)=>_is.assignees.map(({user_name}: {user_name: string})=>user_name).includes(user?.user_name))
            is = _.reverse(_.sortBy(is, [({updatedAt}: {updatedAt: Date})=>new Date(updatedAt)]))
            set_issues(is as IssueInterface[])
        }
        
        
        
    }, [,issues_query.isLoading, issues_query.isError])

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
        fixed: issues.filter(({status})=>status == "fixed").length,
        not_fixed: issues.filter(({status})=>status == "not fixed").length,
        cancelled: issues.filter(({status})=>status == "cancelled").length,
        released: issues.filter(({status})=>status == "released").length,
        high: issues.filter(({severity})=>severity == "high").length,
        low: issues.filter(({severity})=>severity == "low").length,
        medium: issues.filter(({severity})=>severity == "medium").length,
        critical: issues.filter(({severity})=>severity == "critical").length,
        tags: _.flatten(issues.filter(({tags})=> typeof tags !== "undefined" ? tags?.length > 0 : false).map(({tags})=>typeof tags == "undefined" ? [] : tags)) ,
        tag_names: _.uniq(_.flatten(issues.filter(({tags})=> typeof tags !== "undefined" ? tags?.length > 0 : false).map(({tags})=>typeof tags == "undefined" ? [] : tags.map(({tag_name})=>tag_name)))),
        platforms: _.flatten(issues.filter(({platform})=>typeof platform !== "undefined").map(({platform})=>platform)),
        platorm_colors: _.uniq(_.flatten(issues.filter(({platform})=>typeof platform !== "undefined").map(({platform})=>platform))).map(()=>generateRandomColor()) ,
        tag_colors: _.uniq(_.flatten(issues.filter(({tags})=> typeof tags !== "undefined" ? tags?.length > 0 : false).map(({tags})=>typeof tags == "undefined" ? [] : tags.map(({tag_name})=>tag_name)))).map(()=>generateRandomColor()),
        top_issues: _.slice(_.reverse(_.sortBy(issues, (issue)=>issue.comments.length)), 0, 5) ,
        is_loading: issues_query.isLoading,
        is_error: issues_query.isError,
        comments,
        issue_comments: comments?.filter(({issue_id})=>is_def_string(issue_id) == is_def_string(current_issue)) ,
        up,tick
    }
  )
}

export default useIssues