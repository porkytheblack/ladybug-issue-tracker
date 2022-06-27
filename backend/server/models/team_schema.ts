import {Schema, Types, model} from "mongoose"
import userModel from "./user_schema"


const TeamSchema = new Schema({
    team_name: {
        type: String,
        unique: true,
        require: true
    },
    team_creator: {
        type: String,
        required: true
    },
    members: [new Schema({
        user_name: String,
        avatar: String
    })]
})

TeamSchema.pre("save", function(next){
    userModel.findOne({
        user_name: this.team_creator
    }, (err, result)=>{
        if(err) return next()
        this.members[0] = {
            user_name: this.team_creator,
            avatar: result.avatar
        }
        next()
    })
})

export default model("Team", TeamSchema)