import e, { Request, Response } from "express";
import { check_for_required_fields, verify_body } from "../helpers";
import ProjectModel from "../../models/project_schema";
import { extRequest } from "../../middleware/auth";


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
                                    user_name,
                                    avatar
                                }}
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
            ProjectModel.updateOne({"issues._id": issue_id}, 
                {
                    $set: body
                }
            )
        }).catch((e)=>{
            res.status(500).send(e)
        })
    }else{
        res.status(400).send({
            Error: "Invalid issue id"
        })
    }
}

export const update_project = (req: Request, res: Response) =>{
    const project_id = req.params.project_id 
    if(typeof project_id !== "undefined" && project_id.length > 0){
        verify_body(req.body).then((body)=>{
            ProjectModel.updateOne({"_id": project_id}, {
                $set: body
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

export const delete_project = (req: Request, res: Response) =>{
    var project_name  = req.params.project_name 
    project_name = typeof project_name !== "undefined" ? project_name : ""
    if(project_name.length > 0){
        ProjectModel.deleteOne({
            project_name: project_name
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
    var tag_name = req.params.tag_name 
    tag_name = typeof tag_name !== "undefined" ? tag_name : ""
    if(tag_name.length > 0){
        verify_body(req.body).then((body)=>{
            ProjectModel.updateOne({
                "issues.$.tags.tag_name": tag_name 
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

export const delete_assignee = (req: Request, res: Response)=>{
    var user_name = req.params.user_name 
    user_name = typeof user_name !== "undefined" ? user_name : ""
    if(user_name.length > 0){
        ProjectModel.deleteOne({
            "issues.$.assignees.$.user_name": user_name
        }, (err, results)=>{
            if(err){
                res.status(500).send(err)
            }else{
                res.status(200).send(results)
            }
        })
    }else{
        res.status(400).send({
            Error: "Invalid username provided"
        })
    }
}

export const delete_tag = (req: Request, res: Response)=>{
    var tag_name = req.params.tag_name 
    tag_name = typeof tag_name !== "undefined" ? tag_name : ""
    if(tag_name.length > 0){
        ProjectModel.deleteOne({
            "issues.$.tags.$.tag_name": tag_name
        }, (err, results)=>{
            if(err){
                res.status(500).send(err)
            }else{
                res.status(200).send(results)
            }
        })
    }else{
        res.status(400).send({
            Error: "Invalid tagname provided"
        })
    }
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

export const get_project_by_id = (req: extRequest, res: Response) =>{
    const _id = req.params.project_id 
    if(typeof _id == "undefined" || _id == null ) return res.status(400).send({Error: "Invalid project id provided"})
    if(_id.length == 0) return res.status(400).send({Error: "Project Id was not specified"})
    ProjectModel.findById(_id, (err, result)=>{
        if(err) return res.status(500).send(err )
        res.status(200).send(result)
    })
}