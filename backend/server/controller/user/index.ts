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
            console.log(e)
            res.status(500).send(e)
        })
        
    }).catch((e)=>{
        res.status(500).send(e)
    })
    const Model = new UserModel(req.body)
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


