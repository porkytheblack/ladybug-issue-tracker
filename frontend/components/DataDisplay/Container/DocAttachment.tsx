import { DeleteFilled, DownloadOutlined, PaperClipOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import axios from 'axios'
import { useAtom } from 'jotai'
import { isUndefined } from 'lodash'
import React from 'react'
import { backend_url } from '../../../globals'
import { activeIssueAtom, tick_up_issue } from '../../../jotai/state'
import { Text } from '../../../pages/_app'

function DocAttachment({name, _key}:{name: string, _key: string}) {
    const [active_issue, ] = useAtom(activeIssueAtom)
    const [,up]= useAtom(tick_up_issue)
    const delete_asset = () =>{
        axios.delete(`${backend_url}/asset/${active_issue}/${_key}`, {
            withCredentials: true
        }).then(()=>{
            notification.success({
                message: "Deleted succesfully",
                key: "deletion_success"
            })
            up()
        }).catch((e)=>{
            notification.error({
                message: "An error occured",
                key: "deletion_error"
            })
        })
    }

   
  return (
    <div className="flex flex-row w-full items-center justify-between p-[5px_10px] ">
        <div className="flex flex-row items-center justify-start">
            <PaperClipOutlined className="text-black mr-2" />
        <Text className="font-semibold text-md !text-black" >
            {name}
        </Text> 
        </div>
        <div className="flex flex-row items-center justify-end">
            <a href={`${backend_url}/asset/${_key}`} className="!p-0  mr-5 " target="blank" download>
                <DownloadOutlined  className="text-blue-800 cursor-pointer" />
            </a>
            
            <DeleteFilled onClick={delete_asset} className="text-red-700 cursor-pointer "  />
        </div>
        
    </div>
  )
}

export default DocAttachment