const expected_keys = [
    "user_name",
    "email",
    "first_name",
    "last_name",
    "avatar",
    "password",
    "authType",
    "project_name",
    "project_creator",
    "platform",
    "description",
    "summary",
    "assignees",
    "tags",
    "type",
    "severity",
    "status",
    "system_details",
    "author",
    "tag_name",
    "tag_color",
    "system_details",
    "platform",
    "team_name",
    "member",
    "role",
    "project_id",
    "issue_id",
    "team"
]

const action_types = [
    "signup",
    "login",
    "create_project",
    "add_issue",
    "add_comment",
    "add_assignee",
    "add_tag",
    "add_team",
    "add_user_project",
    
]

const required_fields = [
    [
        "user_name"
    ],
    [
        "user_name"
    ],
    [
        "project_name",

    ],
    [
        "summary",
        "type",
        "severity",
        "status"
    ],
    [
        "author",
        "description"
    ],
    [
        "user_name",
        "avatar"
    ],
    [
        "tag_name",
        "tag_color"
    ],
    [
        "team_name"
    ],
    [
        "project_name",
        "role",
        "platform",
        "project_id"
    ]
]

export const verify_body = (body: any): Promise<any> =>{
    return new Promise((res, rej)=>{
            if(typeof body !== "undefined" && Object.keys(body).length > 0){
                var received_keys = Object.keys(body)
                var correct_keys = received_keys.filter((value)=> expected_keys.indexOf(value) !== -1)
                var entries = correct_keys.map((val)=>[val, body[val]])
                var correct_body = Object.fromEntries(entries)
                if(correct_body.lenght  !== 0){
                    res(correct_body)
                }else{
                    rej({
                        Error: "Invalid data provided"
                    })
                }
            }else{
                rej({
                    Error: "Body is invalid or empty"
                })
            }
            
    })
}

export const check_for_required_fields = (data: any, action_type: "signup" | "login" | "create_project" | "add_issue" | "add_comment" | "add_assignee" | "add_tag"| "add_team" | "add_user_project"): Promise<any> =>{
    return new Promise((res, rej)=>{
        if(typeof data !== "undefined"){
            if(Object.keys(data).length > 0){
                var c = Object.keys(data).filter((val)=> required_fields[action_types.indexOf(action_type)].indexOf(val) !== -1 && (data[val].length != 0 ||typeof data[val] !== "undefined" )  )
                if(c.length == required_fields[action_types.indexOf(action_type)].length){
                    res(data)
                }else{
                    rej({
                        Error: "One or more of the fields are missing or empty"
                    })
                }
            }else{
                rej({
                    Error: "Empty body object"
                })
            }
        }else{
            rej({
                Error: "Undefined body"
            })
        }
        
        
    })
}

