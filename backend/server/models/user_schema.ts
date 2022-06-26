import {Schema, ObjectId, Types, model} from "mongoose"
import {hashSync} from "bcrypt"

const UserSchema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    first_name: String,
    last_name: String,
    email: String,
    avatar: {
        type: String,
        default: ""
    },
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


UserSchema.pre("save",function(next){
    if(this.password.length > 0){
        this.password = hashSync(this.password, 15)
        console.log(this.password)
        next()
    }else{
        next()
    }
})

export default model("Users", UserSchema)