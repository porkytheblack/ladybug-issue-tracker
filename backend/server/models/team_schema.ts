import {Schema, Types, model} from "mongoose"

const TeamSchema = new Schema({
    team_name: String,
    members: new Schema({
        user_name: String,
        avatar: String
    })
})

export default model("Team", TeamSchema)