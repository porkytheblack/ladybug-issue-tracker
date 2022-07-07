import {Schema, Types, model, SchemaTypes} from "mongoose"

const AssetSchema = new Schema({
    key: String,
    file_type: String,
    owner: String,
    issue_id: String
},{
    timestamps: true
})

export default model("assets", AssetSchema)