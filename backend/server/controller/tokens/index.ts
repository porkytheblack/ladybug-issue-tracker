import axios from "axios";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import UserModel from "../../models/user_schema"
import {compare} from "bcrypt"
import dayjs from "dayjs";
import RefreshModel from "../../models/refresh_schema"
import { check_for_required_fields, verify_body } from "../helpers";
import { isNull } from "lodash";


const genRefreshToken = async (email: string, user_name: string, avatar: string): Promise<string> =>{
    const token = jwt.sign({
        email,
        user_name,
        avatar
    }, process.env.refresh_token, {
        expiresIn: "40m"
    })

    const RefModel = new RefreshModel({
        token,
        expiresAt: dayjs().add(40, "minutes").toDate()
    })

    return RefModel.save().then(()=>token)

}

const genAccessToken = (email: string, user_name: string, avatar: string): string =>{
    return jwt.sign({
        email, 
        user_name,
        avatar
    }, process.env.access_token, {
        expiresIn: "30m"
    })
}



export const login = (req: Request, res: Response) =>{
    const {authType, user_name, password, sub} = req.body 

    if(typeof authType == "undefined" || !["auth0", "normal"].includes(authType)) return res.status(400).send({Error: "Invalid authType provided"})
    
    if(typeof authType == "string"){
        
        if(authType == "normal"){
            if(typeof user_name !== "string" || typeof password !== "string") return res.status(400).send({Error: "Invalid user_name or password provided"})
            UserModel.findOne({
                $and: [
                    {
                        user_name
                    }
                ]
            }, (err, results)=>{
                if(err){
                    res.status(500).send({
                        Error: "An error occured while retrieving the user"
                    })
                }else{
                    if(Object.keys(results).length > 0){
                        compare(password, results.password, async (err, is_password)=>{
                            if(err){
                                console.log("33", err)
                                res.status(500).send({
                                    Error: err,
                                    message: "An error occured while trying to verify the password"
                                })
                            }else{
                                if(!is_password) return res.status(400).send({Error: "Invalid password provided"})
                                const {user_name, email, authType, avatar} = results
                                res.cookie("access_token", genAccessToken(email, user_name, avatar), {
                                    secure: false,
                                    httpOnly: true,
                                    expires: dayjs().add(30, "minutes").toDate()
                                })
                                
                                
                                res.status(200).send({
                                    user_name,
                                    email,
                                    authType,
                                    avatar,
                                    token: await genRefreshToken(email, user_name, avatar)
                                })
                            }
                        })
                        
                    }else{
                        res.status(404).send({
                            Error: "User Not found"
                        })
                    }
                }
            })
            
        }else{
            console.log("auth0 login")
            if(typeof sub == "undefined") return res.status(400).send({Error: "User Sub was not provided"})

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
                axios.get(`https://dev-1r9889va.us.auth0.com/api/v2/users/${sub}`, {
                    headers: {
                        "Authorization": `Bearer ${_res.data.access_token}`
                    }
                }).then(({data})=>{
                    UserModel.findOne({
                        user_name: data.nickname
                    }, async (err, data)=>{
                        if(err) return res.status(500).send({Error: err})
                        if(!data) return res.status(400).send({Error: "No user exists"})
                        if(Object.keys(data).length == 0) return res.status(404).send({Error: "No such user exists"})
                        const {email, avatar, authType, user_name} = data
                        res.cookie("access_token", genAccessToken(email, user_name, avatar), {
                            secure: false,
                            httpOnly: true,
                            expires: dayjs().add(30, "minutes").toDate()
                        })
                        res.status(200).send({
                            email,
                                avatar,
                                authType,
                                user_name,
                                token: await genRefreshToken(email, user_name, avatar)
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
    }
}


export const refreshtoken = (req: Request, res: Response)=>{
    verify_body(req.body).then((body)=>{
        check_for_required_fields(body, "refresh_token").then((data)=>{
            RefreshModel.findOne({
                token: data.token
            }).then((doc)=>{
                if(isNull(doc)) res.status(403).send({Error: "refresh token invalid"})
                if(new Date(Date.now()) > new Date(doc.expiresAt)){
                   return RefreshModel.deleteOne({
                        token: doc.token
                    }).then(()=>{
                       return res.sendStatus(403)
                    }).catch((e)=>{
                       return res.sendStatus(403)
                    })
                }
                jwt.verify(doc.token, process.env.refresh_token, (err, user)=>{
                    if(err) return res.sendStatus(403)
                    const {email, user_name, avatar} = user as any
                    res.cookie(
                        "access_token", genAccessToken(email, user_name, avatar),{
                            secure: false,
                            httpOnly: true,
                            expires: dayjs().add(30, "minutes").toDate()
                        }
                    )      
                    res.sendStatus(200)
                })
            }).catch((e)=>{
                res.sendStatus(500)
            })
        }).catch((e)=>{
            res.status(401).send(e)
        })
    }).catch((e)=>{
        res.status(400).send({
            ...e
        })
    })
}

export const logout = (req: Request, res: Response)=>{
    verify_body(req.body).then((body)=>{
        check_for_required_fields(body, "refresh_token").then((data)=>{
            RefreshModel.deleteOne({
                token: data.token
            }).then((doc)=>{
                if(isNull(doc)) return res.sendStatus(404)
                res.sendStatus(200)
            }).catch((e)=>{
                res.status(500).send({...e})
            })
        }).catch((e)=>{
            res.status(400).send({
                ...e
            })
        })
    }).catch((e)=>{
        res.status(400).send({
            ...e
        })
    })
}