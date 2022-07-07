import { CloseOutlined, PaperClipOutlined } from '@ant-design/icons'
import { notification, Typography, Upload } from 'antd'
import axios from 'axios'
import { isString, isUndefined } from 'lodash'
import React, { useEffect, useState } from 'react'
import { backend_url } from '../../globals'
import { is_def_string } from '../../helpers'
import { Text } from '../../pages/_app'
import EmptyAndLoading from '../Containers/EmptyAndLoading'

const {Link} = Typography 

function UploadAction({onChange}:{onChange?: (val: any)=>void}) {

  const [attachments, set_attachments] = useState<{
    attachment_key: string,
    file_type: string,
    attachment_name: string
  }[]>([])
  const [loading, set_loading] = useState<boolean>(false)

  const [list, set_list] = useState<string[]>([]) 

  useEffect(()=>{
    if(isUndefined(onChange) ) return ()=>{}
    onChange(attachments)
  }, [attachments, attachments.length])

  const del_asset = (fkey: string) =>{
    set_loading(true)
    if(!isString(fkey) ) return false 
    axios.delete(`${backend_url}/asset/${fkey}`, {withCredentials: true}).then(()=>{
      notification.success({message: "deleted successfully"})
      set_attachments(attachments.filter(({attachment_key:key})=>key !== fkey))
      set_loading(false)
    }).catch((e)=>notification.error({message: "An error occured", key: "error_deleting"}))
  }

  return (
    <div className="flex  flex-col items-start justify-start">
      <Upload onChange={(info)=>{
        set_list(info.fileList.map(({name, originFileObj, fileName})=>(name)))
      }}  customRequest={(options)=>{
            const Form = new FormData()
            Form.append("asset", options.file)
            set_loading(true)
            return axios.post(`${backend_url}/assets`, Form, {
              withCredentials: true
            }).then(({data})=>{
              set_loading(false)
              notification.success({
                message: "Successfully uploaded",
                key: "success_uploading"
              })
              set_attachments((a)=>[...a, {
                attachment_key: data.key,
                file_type: (options.file as any)?.type,
                attachment_name: is_def_string((options.file as any).name)
              }])
              if(isUndefined(options.onSuccess)) return null
              options.onSuccess(data)
              if(isUndefined(options.onProgress)) return null 
              options.onProgress({percent: 100})
            }).catch((e)=>{ 
              if(!isUndefined(options.onError)){
                options.onError(e)
              }
              
            })
          }} showUploadList={false}  >
              <div className="flex flex-row bg-slate-100 rounded-md w-[200px] h-[100px] border-[1px] border-dashed p-5  items-center justify-start">
                  <PaperClipOutlined className="mr-2" />
                  <Text>
                      Drag and drop files to attach or <Link>
                          Browse
                      </Link>
                  </Text>
              </div>
          </Upload>
          <div className="flex flex-col w-full  pt-5 items-center justify-start">
             <EmptyAndLoading showLoading={true} loading={loading}  className='w-full  flex flex-col items-center justify-start' empty_description='No attachments provided'  >
              {
                attachments.map(({attachment_name:name, file_type:type, attachment_key:key})=>(
                  <div className="flex flex-row w-full items-center justify-start">
                    <PaperClipOutlined className='mr-2' />
                      {( list.includes(name) && attachments.map(({attachment_name:name})=>name).includes(name) ) && <Text type="success" className="font-semibold !text-green-800 text-md" >
                        {name}
                      </Text>}
                      {( !list.includes(name) || !attachments.map(({attachment_name:name})=>name).includes(name) ) && <Text type='warning' className="font-semibold  text-md" >
                        {name}
                      </Text>}
                      <div className="flex ml-5 flex-row w-full items-center justify-end">
                        <CloseOutlined onClick={()=>del_asset(key)} className="cursor-pointer" />
                      </div>
                  </div>
                ))
              }
             </EmptyAndLoading>
             
          </div>
    </div>
    
  )
}

export default UploadAction