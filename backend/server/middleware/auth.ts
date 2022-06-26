import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface extRequest extends Request {
    user: {
        user_name: string
    }
}

export const auth_middleware = (req: extRequest, res: Response, next: NextFunction) =>{
        const {url, method} = req
        console.log("cookies=>", req.cookies)
        if((url == "/login" && method == "POST") || (url == "/user" && method == "POST") || (url == "/user/auth0" && method == "POST")) return next()
        const {access_token} = req.cookies 
        console.log(req.cookies)
        if(typeof access_token == "undefined") return res.status(400).send({
            Error: "Access token is undefined"
        })
        if(access_token.length == 0) return res.status(400).send({Error: "Invalid access token provided"})

        jwt.verify(access_token, process.env.access_token, (err, results)=>{
            if(err){
                res.status(500).send({
                    Message: "An error occured while verifying the access token",
                    Error: err
                })
            }else{
                req.user = results 
                next()
            }
        })
}