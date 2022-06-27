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
    team?: string,
    platform?: string,
    description?: string,
    issues?: [{
            summary: string,
            description: string,
            assignees?: [{
                user_name: string,
                avatar: string
            }],
            attachments?: [{
                attachment_name: string,
                attachment: Buffer
            }],
            tags?: [{
                tag_name: string,
                tag_color: string
            }],
            type?: string,
            severity?: string,
            status?: string,
            system_details?: any,
            comments?: [{
                author: {
                    name?: string,
                    avatar?: string 
                },
                
                description?: string,
                lastModified?: Date
            }],

    }]
}

export interface TeamSchema {
    team_name?: string,
    team_creator?: string,
    members?: [{
        user_name: string,
        avatar: string
    }],
    _id?: string
}
