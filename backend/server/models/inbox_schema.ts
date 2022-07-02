import {Schema, Types, model, SchemaTypes} from "mongoose"



const InboxSchema = new Schema({
            from: {
                user_name: String,
                avatar: String
            },
            to: String,
            type: String,
            invite_type: String,
            accepted: {
                type: SchemaTypes.Boolean,
                default: false
            },
            read: {
                type: SchemaTypes.Boolean,
                default: false
            },
            invite_content:{
                type: SchemaTypes.Map,
                of: String
            },
            subject: String,
            msg_content: String,
        }, {
            timestamps: true
        })



export default model("Inbox", InboxSchema)