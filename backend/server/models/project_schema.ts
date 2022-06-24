import {Schema, Types, model, SchemaTypes} from "mongoose"

const ProjectSchema = new Schema({
    project_name: String,
    project_creator: String,
    team: {
        team_name: String
    },
    platform: {
        type: String
    },
    description: String,
    issues: [new Schema({
            summary: String,
            description: String,
            assignees: [new Schema({
                user_name: String,
                avatar: String
            })],
            attachments: [{
                attachment_name: String,
                attachment: SchemaTypes.Buffer
            }],
            tags: [{
                tag_name: String,
                tag_color: String
            }],
            type: String,
            severity: String,
            status: String,
            system_details: {
                type: SchemaTypes.Map,
                of: String
            },
            comments: [new Schema({
                author: {
                    name: String,
                    avatar: String 
                },
                
                description: String,
                lastModified: {
                    type: SchemaTypes.Date,
                    default: new Date(Date.now())
                }
            }, {
                timestamps: true
            })],

    }, {
        timestamps: true
    })]
}, {
    typeKey: "$type",
    timestamps: true
})

export default model("Project", ProjectSchema)