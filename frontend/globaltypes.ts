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