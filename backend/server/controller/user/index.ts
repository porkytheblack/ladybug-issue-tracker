import axios from "axios";
import { Request, Response } from "express";
import UserModel from "../../models/user_schema"
import { check_for_required_fields, verify_body } from "../helpers";


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

export const update_user = (req: Request, res: Response) =>{
    var user_name  = req.params.user_name 
    user_name = typeof user_name !== "undefined" ? user_name : ""

    if(user_name.length > 0){
        verify_body(req.body).then((body)=>{
            UserModel.updateOne({
                user_name: user_name
            }, {
                $set: body
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
    }else{
        res.status(400).send({
            Error: "Invalid username provided"
        })
    }
}

export const add_user_project = (req: Request, res: Response) =>{
    var user_name  = req.params.user_name 
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


export const update_user_project = (req: Request, res: Response) => {
    var user_name  = req.params.user_name 
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

