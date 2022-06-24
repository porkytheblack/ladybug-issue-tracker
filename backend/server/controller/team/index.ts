import { Request, Response } from "express"
import { check_for_required_fields, verify_body } from "../helpers"
import TeamModel from "../../models/team_schema"


export const create_team = (req: Request, res: Response)=>{
    verify_body(req.body).then((body)=>{
        check_for_required_fields(body, "add_team").then((data)=>{
            const Team  = new TeamModel(data)
            Team.save().then((_res)=>{
                res.status(200).send(_res)
            }).catch((e)=>{
                res.status(500).send(e)
            })
        }).catch((e)=>{
            res.status(500).send(e)
        })
    }).catch((e)=>{
        res.status(400).send(e)
    })
}

export const add_team_member = (req: Request, res: Response) => {
    const team = req.params.team
    if(typeof team !== "undefined" && team.length > 0){
        verify_body(req.body).then((body)=>{
            TeamModel.updateOne({team_name: team}, {
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

