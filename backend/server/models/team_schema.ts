import {Schema, Types, model} from "mongoose"

const TeamSchema = new Schema({
    team_name: {
        type: String,
        unique: true,
        require: true
    },
    members: [new Schema({
        user_name: String,
        avatar: String
    })]
})

export default model("Team", TeamSchema)