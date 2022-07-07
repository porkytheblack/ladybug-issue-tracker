// const S3 = require("aws-sdk/clients/s3")
import { S3 } from "aws-sdk"
import fs from "fs"
const S3Instance = new S3(
    {
        region: process.env.bucket_region,
        accessKeyId: process.env.aws_access_key,
        secretAccessKey: process.env.aws_secret_key
    }
)


//upload file

export const uploadFile = (file: any): Promise<any> =>{
    const fileStream = fs.createReadStream(file.path)

    const UploadParams = {
        Bucket: process.env.bucket_name,
        Body: fileStream,
        Key: file.filename
    }

    return S3Instance.upload(UploadParams).promise()
}

//download file

export const getFileStream = (fileKey: string): any =>{
    return S3Instance.getObject({
        Key: fileKey,
        Bucket: process.env.bucket_name,
        
    })
}


//delete file

export const deleteFile = (fileKey: string): any =>{
    return S3Instance.deleteObject({
        Key: fileKey,
        Bucket: process.env.bucket_name
    }).promise()
}