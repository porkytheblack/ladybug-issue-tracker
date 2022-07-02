import { Request, Response } from "express"
import { check_for_required_fields, verify_body } from "../helpers"
import TeamModel from "../../models/team_schema"
import { extRequest } from "../../middleware/auth"
import _ from "lodash"


export const create_team = (req: extRequest, res: Response)=>{
    verify_body(req.body).then((body)=>{
        check_for_required_fields(body, "add_team").then((data)=>{
            const Team  = new TeamModel({...data, team_creator: req.user.user_name})
            Team.save().then((_res)=>{
               return res.status(200).send(_res)
            }).catch((e)=>{
                console.log(e)
                res.status(500).send(e)
            })
        }).catch((e)=>{
            res.status(400).send(e)
        })
    }).catch((e)=>{
        res.status(400).send(e)
    })
}

export const add_team_member = (req: Request, res: Response) => {
    const {team_id} = req.params
    if(typeof team_id !== "undefined" && team_id.length > 0){
        verify_body(req.body).then((body)=>{
            TeamModel.updateOne({_id: team_id}, {
                $push: {
                    members : [
                        body
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
    }else{
        res.status(400).send({
            Error: "team name not provided"
        })
    }
   
}


export const get_user_teams = (req: extRequest, res: Response) =>{
    const {user_name} = req.user 
    TeamModel.find({
        "members.user_name": user_name
    }, (err, results)=>{
        if(err) return res.status(500).send({Error: err, message: "An erro occured while retrieving the data"})
        res.status(200).send(results)
    })
}


export const update_team = (req: extRequest, res: Response) =>{
    const {team_id} =  req.params 
    const {user_name} = req.user
    if(_.isUndefined(team_id)) return res.status(500).send({Error: "team id is undefined"})
    verify_body(req.body).then((body)=>{
        TeamModel.findOneAndUpdate({
            _id: team_id,
            team_creator: user_name
        }, body).lean().exec((err, doc)=>{
            if(err) return res.status(400).send({message: "An error occured", Error: err})
            res.status(200).send(doc)
        })
    }).catch((e)=>{
        res.status(400).send({Error: e})
    })
}