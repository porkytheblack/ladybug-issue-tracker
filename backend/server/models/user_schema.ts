import {Schema, ObjectId, Types, model} from "mongoose"

const UserSchema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    first_name: String,
    last_name: String,
    email: String,
    avatar: String,
    password: String,
    authType: {
        type: String,
        default: "normal",
        enum: ["normal" , "auth0"]
    },
    projects: [
        {
            project_name: String,
            role: {
                type: String,
                default: "assignee"
            },
            platform: String,
            project_id: {
                type: Types.ObjectId,
            }
        }
    ]
})


export default model("Users", UserSchema)