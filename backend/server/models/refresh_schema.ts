import {model, Schema, SchemaType} from "mongoose"

const refreshSchema = new Schema({
    token: String,
    expiresAt: Date
}, {
    timestamps: true
})

export default model("RefreshTokens", refreshSchema)