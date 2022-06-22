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
            project_platform: String,
            project_id: {
                type: Types.ObjectId,
                required: true,
                unique: true
            }
        }
    ],
    issues: [
        {
            issue_id: {
                type: Types.ObjectId,
                unique: true,
                required: true
            },
            summary: String,
            description: String,
            type: String,
            severity: String,
            status: String,
            tags: [
                {
                    tag_name: {
                        type: String,
                        unique: true
                    },
                    tag_color: {
                        type: String,
                        unique: true
                    }
                }
            ],
            system_details: {
                type: Types.Map,
                of: String
            }
        }
    ]
})


export default model("User", UserSchema)