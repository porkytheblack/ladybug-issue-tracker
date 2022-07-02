import axios from "axios";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import UserModel from "../../models/user_schema"
import {compare} from "bcrypt"
import dayjs from "dayjs";

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
                    console.log("25", err)
                    res.status(500).send({
                        Error: "An error occured while retrieving the user"
                    })
                }else{
                    if(Object.keys(results).length > 0){
                        compare(password, results.password, (err, is_password)=>{
                            if(err){
                                console.log("33", err)
                                res.status(500).send({
                                    Error: err,
                                    message: "An error occured while trying to verify the password"
                                })
                            }else{
                                if(!is_password) return res.status(400).send({Error: "Invalid password provided"})
                                const {user_name, email, authType, avatar} = results
                                res.cookie("access_token", jwt.sign({
                                    user_name: user_name,
                                    avatar: avatar,
                                    email: email
                                }, process.env.access_token), {
                                    secure: false,
                                    httpOnly:false,
                                    expires: dayjs().add(24, "hours").toDate(),
                                    domain: "localhost"
                                })
                                res.status(200).send({
                                    user_name,
                                    email,
                                    authType,
                                    avatar
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
                    }, (err, data)=>{
                        if(err) return res.status(500).send({Error: err})
                        if(!data) return res.status(400).send({Error: "No user exists"})
                        if(Object.keys(data).length == 0) return res.status(404).send({Error: "No such user exists"})
                        const {email, avatar, authType, user_name} = data
                        console.log(data, 88)
                        res.cookie("access_token", jwt.sign({
                            user_name: `${user_name}`,
                            avatar: `${avatar}`,
                            email: email
                        }, process.env.access_token), {
                            secure: false,
                            httpOnly: false,
                            expires: dayjs().add(24, "hours").toDate()
                        })
                        res.status(200).send({
                            email,
                                avatar,
                                authType,
                                user_name
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