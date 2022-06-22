import {Schema, Types, model} from "mongoose"

const ProjectSchema = new Schema({
    project_name: String,
    project_creator: String,
    team: {
        team_id: Types.ObjectId,
        team_name: String
    },
    platform: {
        type: String
    },
    description: String,
    issues: new Schema({
            summary: String,
            description: String,
            asignees: new Schema({
                user_name: String,
                avatar: String
            }),
            attachmanets: new Schema({
                attachment_name: String,
                attachment: Types.Buffer
            }),
            tags: new Schema({
                tag_name: String,
                tag_color: String
            }),
            type: String,
            severity: String,
            status: String,
            system_details: {
                type: Types.Map,
                of: String
            },
            comments: new Schema({
                author: {
                    name: String,
                    avatar: String
                },
                created_at: {
                    type: Date ,
                    default: new Date()
                },
                last_update: {
                    type: Date,
                    default: new Date()
                },
                description: String
            }),

    })
})

export default model("Project", ProjectSchema)