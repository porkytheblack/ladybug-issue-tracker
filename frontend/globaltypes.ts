export type severity_types  ="high" | "medium" | "low" | "critical"

export interface tagStat{
    tag: string,
    count: number,
    color: string
};

export interface basic_chart_data {
    labels: string[],
    color: string[],
    count: number[]
}


export interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
  }
  
export interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
  }

  export interface projectInterface {
    _id?: string,
    project_name?: string,
    project_creator?: string,
    team_id?: string,
    team?: string,
    platform?: string,
    description?: string,
    issues?: {
            _id: string,
            summary: string,
            description: string,
            assignees?: {
                user_name: string,
                avatar: string
            }[],
            attachments?: {
                attachment_name: string,
                attachment_key: string,
                file_type:  string
            }[],
            tags: {
                tag_name: string,
                tag_color: string,
                _id: string
            }[],
            type?: string,
            severity?: string,
            status?: string,
            system_details?: any,
            comments: {
                author: {
                    user_name?: string,
                    avatar?: string 
                },
                
                description?: string,
                lastModified?: Date,
                _id: string
            }[],
            platform: String,
            updatedAt: Date
    }[]
}

export interface TeamSchema {
    team_name?: string,
    team_creator?: string,
    members: {
        user_name?: string,
        avatar?: string,
        _id: string
    }[],
    _id?: string
}

export interface IssueInterface {
            _id: string,
            summary: string,
            description: string,
            assignees?: {
                user_name: string,
                avatar: string,
                _id: string
            }[],
            attachments?: {
                attachment_name: string,
                attachment_key: string,
                file_type:  string,
                _id: string
            }[],
            tags?: {
                tag_name: string,
                tag_color: string,
                _id: string
            }[],
            type?: string,
            severity?: string,
            status?: string,
            system_details?: any,
            comments: {
                author: {
                    user_name?: string,
                    avatar?: string 
                },
                summary?: string,
                description?: string,
                lastModified?: Date,
                _id: string,
                issue_id?: string
            }[],        
            platform?: string,
            updatedAt: Date
}


export interface CommentInterface {
    author: {
        user_name?: string,
        avatar?: string 
    },
    description?: string,
    lastModified?: Date,
    _id: string,
    issue_id?: string
}

export interface extCommentInterface extends CommentInterface {
    summary: string
}


export interface InboxSchema {
    from: {
        user_name: string,
        avatar: string,
    },
    to: String,
    type: String,
    invite_type?: String,
    accepted: boolean,
    read: boolean,
    invite_content?:{
        team_id?: string,
        team_name?: string
    },
    subject?: string,
    msg_content?: string,
    createdAt: Date,
    _id: string
}
