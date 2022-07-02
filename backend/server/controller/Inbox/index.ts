import {Request, Response} from "express"
import { extRequest } from "../../middleware/auth"
import InboxModel from "../../models/inbox_schema"
import { verify_body } from "../helpers"

import _ from "lodash"

export const add_inbox = (req: extRequest, res: Response) =>{
    const {user_name, avatar} = req.user
    verify_body(req.body).then((body)=>{
        const NewInbox = new InboxModel({
            from: {
                user_name,
                avatar
            },
            ...body
        })
        NewInbox.save().then((doc)=>{
            res.status(200).send(doc)
        }).catch((e)=>{
            res.status(500).send(e)
        })
    }).catch((e)=>{
        res.status(500).send(e)
    })
}

export const update_inbox = (req: extRequest, res: Response) => {
    const {user_name, email} = req.user 
    const {inbox_id}  = req.params 

    if(_.isUndefined(inbox_id)  || inbox_id?.length == 0 ) return res.status(400).send({Error: "Invalid inbox_id or inbox_id was not provided"})
    
    verify_body(req.body).then((body)=>{
        InboxModel.findOneAndUpdate({
            _id: inbox_id,
            $or: [
                {
                    to: user_name
                },
                 {
                    to: email
                 }
            ]
        }, {
            $set: body
        }).lean().exec((err, doc)=>{
            if(err) return res.status(500).send({Error: err, message: "An error occured"})
            res.status(200).send(doc)
        })
    }).catch((e)=>{
        res.status(400).send(e)
    })

}

export const get_user_inbox = (req: extRequest, res: Response) =>{
    const {user_name, email} = req.user 
    InboxModel.find({
        $or: [
            {
                to: user_name
            },
            {
                to: email
            }
        ]
    }).lean().exec((err, doc)=>{
        if(err) return res.status(500).send(err)
        res.status(200).send(doc)
    })
}