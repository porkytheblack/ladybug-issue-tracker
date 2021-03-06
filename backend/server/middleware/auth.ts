import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface extRequest extends Request {
    user: {
        user_name: string,
        avatar: string,
        email: string
    }
}

export const auth_middleware = (req: extRequest, res: Response, next: NextFunction) =>{
        const {url, method} = req
        if((url == "/login" && method == "POST") || (url == "/user" && method == "POST") || (url == "/user/auth0" && method == "POST") || (url == "/token" && method == "POST")) return next()
        
        const {access_token} = req.cookies
        if(typeof access_token == "undefined") return res.status(400).send({
            Error: "Access token is undefined"
        })

        if(access_token.length == 0) return res.status(400).send({Error: "Invalid access token provided"})
        jwt.verify(access_token, process.env.access_token, (err, results)=>{
            if(err){
                res.sendStatus(403)
            }else{
                const {avatar, user_name, email} = results
                req.user = {avatar, user_name, email}
                next()
            }
        })
}