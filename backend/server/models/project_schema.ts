import {Schema, Types, model, SchemaTypes} from "mongoose"

const ProjectSchema = new Schema({
    project_name: {
        type: String,
        required: true,
        unique: true
    },
    project_creator: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    team_id: String,
    platform: {
        type: String
    },
    description: String,
    issues: [{
        type: new Schema({
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
            platform: String,
            type: String,
            severity: String,
            status: String,
            system_details: {
                type: String
            },
            comments: [{
                type: new Schema({
                author: {
                    user_name: String,
                    avatar: String 
                },
                
                description: String,
                lastModified: {
                    type: SchemaTypes.Date,
                }
            }, {
                timestamps: true
            })}],

    }, {
        timestamps: true
    })}]
})



export default model("Project", ProjectSchema)