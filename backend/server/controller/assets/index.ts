import {Request, Response} from "express"
import { ReadStream } from "fs"
import { deleteFile, getFileStream, uploadFile } from "../helpers/aws_bucket"
import AssetModel from "../../models/asset_schema"
import ProjectModel from "../../models/project_schema"
import _, { isNull, isString, isUndefined } from "lodash"

export const get_asset = async (req: Request, res: Response)=>{
    const {key} = req.params
    try{
        const mstream = await getFileStream(key)
        if(mstream){
            mstream.createReadStream().on("error", e =>{
                console.log(e)
            }).pipe(res)
        }
    }catch(e){
        res.status(404).send({
            message: "File not found",
            Error: e
        })
    }
    
}

export const add_issue_asset = (req: Request, res: Response)=>{
    const file = req.file 
    const {issue_id} = req.params
    if(_.isUndefined(issue_id) || issue_id.length == 0) return res.status(400).send({
        Error: "Invalid issue_id provided"
    })
    
    ProjectModel.updateOne({
        "issues._id": issue_id
    }, {
        $push: {
            "issues.$.attachments": req.body.attachment
        }
    }).then((doc)=>{
        res.status(200).send({
            message: "Success",
            don: doc
        })
    }).catch((e)=>{
        res.status(500).send({
            Error: e,
            message: "An error occured"
        })
    })

    
}

export const add_asset = (req: Request, res: Response)=>{
    const file = req.file 
    if(_.isNull(file) || _.isUndefined(file) ) return res.status(400).send({
        Error: "No file was provided"
    })
    uploadFile(file).then((uploaded)=>{
        console.log(uploaded)
        res.status(200).send({
            key: uploaded.key,
        })
    }).catch((e)=>{
        res.status(500).send({
            Error: e
        })
    })
}

export const delete_asset = (req: Request, res: Response)=>{
    const {key} = req.params 
    if(isUndefined(key) || isNull(key) || key.length == 0) return res.status(400).send({
        Error: "Invalid or no key provided"
    })
    deleteFile(key).then(()=>{
        res.status(200).send({
            message: "Deleted successfully"
        })
    }).catch((e)=>{
        res.status(500).send({
            Error: e,
            message: "Unable to delete the file"
        })
    })
}

export const delete_issue_asset = (req: Request, res: Response) => {
    const {issue_id, key} = req.params 
    if(!isString(issue_id) || !isString(key) || issue_id.length == 0 || key.length == 0) return res.status(400).send({
        Error: "Issue Id or Key is undefined or empty"
    })
    ProjectModel.updateOne(
        {
            "issues._id": issue_id
        }, {
            $pull: {
                "issues.$.attachments": {
                    "attachment_key": key
                }
            }
        }
    ).then(()=>{
        deleteFile(key).then(()=>{
            res.status(200).send({
                message: "File Delete successfully"
            })
        }).catch((e)=>{
            res.status(500).send({
                Error: e,
                message: "Unable to delete the file from aws"
            })
        })
    }).catch((e)=>{
        res.status(500).send({
            message: "An error occured while deleting the attachment from mongodb",
            Error: e
        })
    })
}