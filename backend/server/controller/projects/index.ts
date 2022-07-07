import e, { Request, Response } from "express";
import { check_for_required_fields, verify_body } from "../helpers";
import ProjectModel from "../../models/project_schema";
import TeamModel from "../../models/team_schema"
import { extRequest } from "../../middleware/auth";
import _, { isString } from "lodash"

var user_projects = []


export const create_project = (req: extRequest, res: Response)=>{
    const {user_name} = req.user
    verify_body(req.body).then((body)=>{
        check_for_required_fields(body, "create_project").then((data)=>{
            const NewProject = new ProjectModel({...data, project_creator: user_name})
            NewProject.save().then((_res)=>{
                res.status(200).send(_res)
            }).catch((e)=>{
                res.status(500).send(e)
            })
        }).catch((e)=>{
            res.status(400).send(e)
        })
    })
}

export const create_project_issue = (req: extRequest, res: Response) =>{
    const proj_id = req.params.project_id
    const {user_name} = req.user
    
    verify_body(req.body).then((body)=>{
        console.log(body)
        check_for_required_fields(body, "add_issue").then((data)=>{
            if(typeof proj_id == "string"){
                ProjectModel.updateOne({_id: proj_id}, {
                    $push: {
                        issues: [
                            {...data, creator: {
                                user_name,
                                avatar: ""
                            }}
                        ]
                    }
                }, (err, result)=>{
                    if(err){
                        res.status(500).send(err)
                    }else{
                        res.status(200).send(result)
                    }
                })
            }else{
                res.status(400).send({
                    Error: "Project Id not present"
                })
            }
            
        }).catch((e)=>{
            res.status(500).send(e)
        })
    })
}

export const create_comment  = (req: extRequest, res: Response) =>{
    const issue_id = req.params.issue_id
    const {user_name, avatar} = req.user
    if(typeof issue_id !== "undefined" && issue_id.length > 0){
        verify_body(req.body).then((body)=>{
            check_for_required_fields(body, "add_comment").then((data)=>{
                ProjectModel.updateOne({"issues._id": issue_id}, {
                        $push: {
                            "issues.$.comments": [
                                {...data, author: {
                                    user_name: user_name,
                                    avatar: avatar
                                },
                                lastModified: new Date(Date.now())
                            }
                            ]
                        },
                }, (err, result)=>{
                    if(err){
                        res.status(500).send(err)
                    }else{
                        res.status(200).send(result)
                    }
                })
                
            }).catch((e)=>{

                res.status(400).send(e)
            })
        }).catch((e)=>{
            res.status(400).send(e)
        })
    }else{
        res.status(400).send({
            Error: "Invalid issue id provided"
        })
    }
    
}

export const add_assignee = (req: Request, res: Response) =>{
    const issue_id = req.params.issue_id
    if(typeof issue_id !== "undefined" && issue_id.length > 0){
        verify_body(req.body).then((body)=>{
            check_for_required_fields(body, "add_assignee").then((data)=>{
                ProjectModel.updateOne({"issues._id": issue_id}, {
                    $push: {
                        "issues.$.assignees": [
                            data
                        ]
                    }
                }, (err, result)=>{
                    if(err){
                        res.status(500).send(err)
                    }else{
                        res.status(200).send(result)
                    }
                })
            }).catch((e)=>{
                res.status(400).send(e)
            })
        }).catch((e)=>{
            res.status(400).send(e)
        })
    }else{
        res.status(400).send({
            Error: "Invalid Issue id provided"
        })
    }
}

export const add_tag = (req: Request, res: Response) =>{
    const issue_id = req.params.issue_id 
    if(typeof issue_id !== "undefined" && issue_id.length > 0){
        verify_body(req.body).then((body)=>{
            check_for_required_fields(body, "add_tag").then((data)=>{
                ProjectModel.updateOne({"issues._id": issue_id}, {
                    $push: {
                        "issues.$.tags": [
                            data
                        ]
                    }
                }, (err, result)=>{
                    if(err){
                        res.status(500).send(err)
                    }else{
                        res.status(200).send(result)
                    }
                })
            }).catch((e)=>{
                res.status(400).send(e)
            })
        }).catch((e)=>{
            res.status(400).send(e)
        })
    }else{
        res.status(400).send({
            Error: "Invalid issue id provided"
        })
    }
}

export const update_system_details  = (req: Request, res: Response) =>{
    const issue_id = req.params.issue_id
    if(typeof issue_id !== "undefined" && issue_id.length > 0){
        
        verify_body(req.body).then((body)=>{
            ProjectModel.updateOne({"issues._id": issue_id}, {
                $set: Object.fromEntries(
                    Object.entries(body.system_details).map(([key, val])=>[
                        [`issues.$.system_details.${key}`], 
                        val
                    ])
                )
            }, (err, results)=>{
                if(err){
                    res.status(500).send(err)
                }else{
                    res.status(200).send(results)
                }
            })
        }).catch((e)=>{
            res.status(400).send(e)
        })
    }else{
        res.status(400).send({
            Error: "Invalid issue id provided"
        })
    }
}

export const update_issue = (req: Request, res: Response) =>{
    const issue_id = req.params.issue_id
    if(typeof issue_id !== "undefined" && issue_id.length > 0 ){
        verify_body(req.body).then((body)=>{
            var _body = Object.fromEntries(Object.entries(body).map(([key, val])=>(
                [`issues.$.${key}`, val]
            )))
            
            ProjectModel.updateOne({
                "issues._id": issue_id
            }, {
                $set: _body
            }).exec((err, doc)=>{
                if(err) return res.status(500).send({Error: err, message: "Unable to update the issue"})
                res.status(200).send(doc)
            })
            
        }).catch((e)=>{
            res.status(400).send({
                Error: e
            })
        })
    }else{
        res.status(400).send({
            Error: "Invalid issue id"
        })
    }
}




export const update_project = (req: extRequest, res: Response) =>{
    const project_id = req.params.project_id 
    
    if(typeof project_id !== "undefined" && project_id.length > 0){
        verify_body(req.body).then((body)=>{
            ProjectModel.updateOne({
                "_id": project_id,
                project_creator: req.user.user_name
            }, {
                $set: body,

            }, (err, results)=>{
                if(err){
                    res.status(500).send(err)
                }else{
                    res.status(200).send(results)
                }
            })
        }).catch((e)=>{
            res.status(400).send(e)
        })
        
    }else{
        res.status(500).send({
            Error: "Project id invalid"
        })
    }
}

export const delete_project = (req: extRequest, res: Response) =>{
    var project_id  = req.params.project_id
    const {user_name} = req.user
    project_id = typeof project_id !== "undefined" ? project_id : ""
    if(project_id.length > 0){
        ProjectModel.deleteOne({
            $and: [
                {
                    _id: project_id
                },
                {
                    project_creator: user_name
                }
            ]
        }, (err, results)=>{
            if(err){
                res.status(500).send(err)
            }else{
                res.status(200).send(results)
            }
        })
    }else{
        res.status(400).send({
            Error: "Invalid Project name provided"
        })
    }
}

export const delete_issues = (req: Request, res: Response) =>{
    var issue_id = req.params.issue_id 
    issue_id = typeof issue_id == "undefined" ? "" : issue_id 
    if(issue_id.length > 0){
        ProjectModel.deleteOne({
            "issues._id": issue_id
        }, (err, results)=>{
            if(err){
                res.status(400).send(err)
            }else{
                res.status(200).send(results)
            }
        })
    }else{
        res.status(400).send({
            Error: "Invalid issue id"
        })
    }
}

export const delete_comment  = (req: Request, res: Response) =>{
    var comment_id = req.params.comment_id 
    comment_id = typeof comment_id !== "undefined" ? comment_id : "" 
    if(comment_id.length > 0){
        ProjectModel.deleteOne({
            "issues.$.comments._id": comment_id
        }, (err, results)=>{
            if(err){
                res.status(500).send(err)
            }else{
                res.status(200).send(results)
            }
        })
    }else{
        res.status(400).send({
            Error: "Invalid comment id provided"
        })
    }
}

export const update_comment = (req: Request, res: Response) =>{
    var comment_id = req.params.comment_id 
    comment_id = typeof comment_id !== "undefined" ? comment_id : "" 
    if(comment_id.length > 0){
        verify_body(req.body).then((body)=>{
            ProjectModel.updateOne({
                "issues.$.comments._id": comment_id
            }, {
                $set: body
            })
        }).catch((e)=>{
            res.status(400).send(e)
        })
        
    }else{
        res.status(400).send({
            Error: "Invalid comment id provided"
        })
    }
}


export const update_tag = (req: Request, res: Response) =>{
    var {tag_id, issue_id} = req.params
    tag_id = typeof tag_id !== "undefined" ? tag_id : ""
    if(tag_id.length  ==  24){
        verify_body(req.body).then((body)=>{
            
            ProjectModel.updateOne({
                "issues._id": issue_id
            }, {
                $set: body
            })
        }).catch((e)=>{
            res.status(400).send(e)
        })
    }else{
        res.status(400).send({
            Error: "Invalid tag provided"
        })
    }
}

export const update_tags = (req: extRequest, res: Response) =>{
    const {issue_id} = req.params
    if(_.isUndefined(issue_id) || issue_id.length !== 24) return res.status(400).send({Error:  "Invalid or No Issue id was provided"})
    verify_body(req.body).then((body)=>{
        console.log(body)
        ProjectModel.updateOne({"issues._id": issue_id}, {
            $set: {
                "issues.$.tags": body.tags
            }
        }).lean().exec((err, result)=>{
            if(err) return res.status(500).send(err)
            res.status(200).send(result)
        })
    }).catch((e)=>{
        res.status(400).send(e)
    })
    
}

export const delete_assignee = (req: Request, res: Response)=>{
    var {issue_id, assignee_id} = req.params
    if(!isString(issue_id) || !isString(assignee_id) || issue_id.length == 0 || assignee_id.length == 0 ) return res.status(400).send({message: "Unable to delete item"})
    ProjectModel.updateOne({
        "issues._id": issue_id
    }, {
        $pull: {
            "issues.$.assignees": {
                _id: assignee_id
            }
        }
    }).then((doc)=>{
        res.status(200).send({
            message: "Deleted assignee successfully",
            ...doc
        })
    }).catch((e)=>{
        res.status(500).send({
            ...e,
            message: "An error occured while deleting the assignee"
        })
    })
}

export const delete_tag = (req: Request, res: Response)=>{
    const {tag_id, issue_id} = req.params
    if(!isString(tag_id) || tag_id.length == 0 || !isString(issue_id) || issue_id.length == 0) return res.status(400).send({
        Error: "Tag or Issue invalid or not provided"
    })
    ProjectModel.updateOne({
        "issues._id": issue_id
    }, {
        $pull: {
            "issues.$.tags": {
                _id: tag_id
            }
        }
    }).then((doc)=>{
        res.status(200).send({
            ...doc,
            message: "Deleted tag successfully"
        })
    }).catch((e)=>{
        res.status(400).send({
            ...e,
            message: "An error occured"
        })
    })
}


export const get_user_issues = (req: extRequest, res: Response)=>{
    ProjectModel.find({
        "issues.assignees.user_name": req.user.user_name
    }, (err, result)=>{
        if(err) return res.status(500).send({Error: err, message: "An error occured while trying to retrieve the issue"})
        res.status(200).send(result)
    })
}   

export const get_user_projects = (req: extRequest, res: Response)=>{
    
    ProjectModel.find({
        $or: [
            {
                project_creator: req.user.user_name
            },
            {
                "issues.assignees.user_name": req.user.user_name
            }
        ]
    }, (err, result)=>{
        if(err) return res.status(500).send({Error: e, message: "An error occured while retrieving projects"})
        res.status(200).send(result)
    })
}

export const get_all_user_projects = (req: extRequest, res: Response) =>{
    const {user_name} = req.user   

    
    ProjectModel.find({}).exec((err, projects)=>{
        if(err) res.status(500).send({Error: err, message: "Unable to retrieve all projects"})
        Promise.all(projects.map(async (project)=>{
            if (project.team_id.length == 0) return null
            
            return TeamModel.findOne({
                $and: [
                    {
                        team_name: project.team
                    },
                    {
                        _id: project.team_id
                    },
                    {
                        "members.user_name": user_name
                    }
                ]
            }).then((data)=>{
                if(data == null) return null 
                return project
            }).catch((e)=>{
                res.status(500).send({
                    Error: e,
                    message: "Unable to find team"
                })
            })
        })).then((data)=>{
            res.status(200).send(data.filter((d)=>d !== null))
        }).catch((e)=>{
            res.status(500).send({Error: e})
        })
    })
}

export const get_project_by_id = (req: extRequest, res: Response) =>{
    const _id = req.params.project_id 
    if(typeof _id == "undefined" || _id == null ) return res.status(400).send({Error: "Invalid project id provided"})
    if(_id.length == 0) return res.status(400).send({Error: "Project Id was not specified"})
    ProjectModel.findById(_id, (err, result)=>{
        if(err) return res.status(500).send(err )
        res.status(200).send(result)
    })
}

export const get_issue_by_id = (req: extRequest, res: Response) =>{
    const  id = req.params.issue_id 
    const {user_name} = req.user
    console.log(id.toString().length)
    if(typeof id == "undefined" || id.length == 0) return res.status(400).send({Error: "issue id not specified"})
    ProjectModel.find({
        "issues._id": id,
    }, (err, result)=>{
        if(err)return res.status(500).send({Error: err, message: "An error occured"})
        var data = result[0]?.issues.filter(({_id})=>_id.toString() == id)
        res.status(200).send(data)
    })
}

export const get_comments = (req: extRequest, res: Response) => {
    ProjectModel.find({
        "issues.assignees.user_name": req.user.user_name
    }).sort({"issues.comments.lastModified": -1}).exec((err, docs)=>{
        if(err) return res.status(500).send({Error: err, meaage: "An error occured"})
        res.status(200).send(docs)
    })
}