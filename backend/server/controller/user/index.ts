import axios from "axios";
import { Request, Response } from "express";
import { extRequest } from "../../middleware/auth";
import UserModel from "../../models/user_schema"
import TeamModel from "../../models/team_schema"
import InboxModel from "../../models/inbox_schema"
import ProjectModel from "../../models/project_schema"
import { check_for_required_fields, verify_body } from "../helpers";
import _, { isNull, isUndefined } from "lodash"
import {hashSync} from "bcrypt"


export const create_user = (req: Request, res: Response) =>{
    verify_body(req.body).then((body)=>{
        check_for_required_fields(body, "signup").then((data)=>{
            const NewUser = new UserModel(data)
            NewUser.save().then((_res)=>{ 
                res.status(200).send(_res)
            }).catch((e)=>{
                console.log(e)
                res.status(500).send({
                    Error: "Unable to save the user to the database"
                })
            })
        }).catch((e)=>{
            res.status(500).send(e)
        })
        
    }).catch((e)=>{

        res.status(500).send(e)
    })
}

export const update_user = (req: extRequest, res: Response) =>{
    const {user_name} = req.user
    console.log(req.body)
    if(user_name.length > 0){
        verify_body(req.body).then((body)=>{
            if(typeof body.password !== "undefined") body.password = hashSync(body.password, 15)
            UserModel.updateOne({
                user_name: user_name
            }, {
                $set: body
            }).then((doc)=>{
                if(!(!isUndefined(body.user_name) || !isUndefined(body.avatar))) return res.sendStatus(200)
                Promise.all([
                ProjectModel.updateMany({
                    "issues.assignees.user_name": user_name
                },{
                    $set: _.isUndefined(body.avatar)  ? {"issues.$[].assignees.$[element].user_name": body.user_name} : {"issues.$[].assignees.$[element].avatar": body.avatar}
                },
                {
                    arrayFilters: [
                        {
                            "element.user_name": user_name
                        }
                    ]
                }).then(()=>true).catch((e)=>{
                    return e
                }),
                ProjectModel.updateMany({
                    "issues.comments.author.user_name": user_name
                },{
                    $set: _.isUndefined(body.avatar) ?  { "issues.$[].comments.$[element].author.user_name": body.user_name } : {"issues.$[].comments.$[element].author.avatar": body.avatar}
                }, {
                    arrayFilters: [
                        {
                            "element.author.user_name": user_name
                        }
                    ]
                }).then(()=> {
                    return true
                }).catch((e)=>{
                    return e
                }), 
                InboxModel.updateMany({
                    "from.user_name": user_name
                },{
                    $set: _.isUndefined(body.avatar) ?  { "from.user_name": body.user_name } : {"from.avatar": body.avatar}
                }).then(()=> {
                    return true
                }).catch((e)=>{
                    return e
                }),
                TeamModel.updateMany({
                    "members.user_name": user_name
                }, {
                    $set: _.isUndefined(body.avatar) ? {"members.$.user_name": body.user_name}:{"members.$.avatar": body.avatar}
                }).then(()=> true).catch((e)=>{
                    return e
                })]).then((doc)=>{
                    res.status(200).send({message: "Success"})
                }).catch((e)=>{
                    res.status(500).send({Error: e})
                })
            }).catch((e)=>{
                res.status(500).send(e)
            })
        }).catch((e)=>{
            res.status(400).send(e)
        })
    }else{
        res.status(400).send({
            Error: "Invalid username provided"
        })
    }
}

export const add_user_project = (req: extRequest, res: Response) =>{
    var {user_name } = req.user 
    user_name = typeof user_name !== "undefined" ? user_name : ""

    if(user_name.length > 0){
        verify_body(req.body).then((body)=>{
            check_for_required_fields(body, "add_user_project").then((data)=>{
                UserModel.updateOne({user_name: user_name}, {
                    $push: {
                        projects: [
                            data
                        ]
                    }
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
            
        }).catch((e)=>{
            res.status(400).send(e)
        })
    }else{
        res.status(500).send({
            Error: "No or Invalid username provided"
        })
    }

}   


export const update_user_project = (req: extRequest, res: Response) => {
    var user_name  = req.user.user_name 
    user_name = typeof user_name !== "undefined" ? user_name : ""

    if(user_name.length > 0){
        verify_body(req.body).then((body)=>{
            UserModel.updateOne({user_name: user_name}, {
                $set: body
            }, (err, results)=>{
                if(err){
                    res.status(400).send(err)
                }else{  
                    res.status(200).send(results)
                }
            })
        }).catch((e)=>{
            res.status(400).send(e)
        })
    }else{
        res.status(400).send({
            Error: "No or Invalid username provided"
        })
    }
}

export const create_auth0_user = (req: Request, res: Response) =>{
    
    const {user_sub} = req.body
    axios.post("https://dev-1r9889va.us.auth0.com/oauth/token", {
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        audience: process.env.audience,
        grant_type: "client_credentials"
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((_res)=>{
        axios.get(`https://dev-1r9889va.us.auth0.com/api/v2/users/${user_sub}`, {
            headers: {
                "Authorization": `Bearer ${_res.data.access_token}`
            }
        }).then(({data})=>{

            const User = new UserModel({
                user_name: data.nickname,
                email: data.email,
                first_name: data.given_name,
                last_name: data.family_name,
                avatar: data.picture,
                password: "",
                authType: "auth0"
            })
            User.save().then((value)=>{
                res.status(200).send(value)
            }).catch((e)=>{
                res.status(500).send({
                    message: "Unable to create user",
                    Error: e
                })
            })
        }).catch((e)=>{
            res.status(500).send({
                message: "An error occured while trying to retrieve the user",
                Error: e
            })
        })
    }).catch((e)=>{
        res.status(500).send(e)
    })


}


export const get_user = (req: extRequest, res: Response)=>{
        const {user_name} = req.user
        UserModel.findOne({
            user_name: user_name
        }).then((doc)=>{
            if(isNull(doc)) return res.sendStatus(404)
            const {user_name, email, avatar, first_name, last_name} = doc
            res.status(200).send({
                user_name,
                email,
                first_name,
                last_name,
                avatar
            })
        }).catch((e)=>{
            res.sendStatus(500)
        })
}
