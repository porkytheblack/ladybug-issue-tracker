

export const is_def_string = (a: any): string =>{
    if(typeof a == "undefined"){
        return ""
    }else{
        if(a !== null){
            return a
        }
        return ""
    }
}