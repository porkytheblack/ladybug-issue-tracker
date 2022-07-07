import { CloseOutlined, DeleteFilled } from '@ant-design/icons'
import { Image, notification } from 'antd'
import axios from 'axios'
import { useAtom } from 'jotai'
import React from 'react'
import { backend_url } from '../../globals'
import { activeIssueAtom, tick_up_issue } from '../../jotai/state'
import BaseModalContainer from '../Containers/BaseModalContainer'

function ImagePreview({onClose, visible, image, _key}:{onClose: ()=>any, visible: boolean, image: string, _key: string}) {  
    
    const [,up] = useAtom(tick_up_issue)
    const [issue, ]= useAtom(activeIssueAtom)

    const del_asset = () =>{
        axios.delete(`${backend_url}/asset/${issue}/${_key}`, {
            withCredentials: true
        }).then(()=>{
            notification.success({
                message: "Deleted Image successfully",
                key: "del success"
            })
            up()
        }).catch((e)=>{
            notification.error({
                message: "An  error occured",
                key: "error_deleting_item"
            })
        })
    }
  return (
    <BaseModalContainer hide={onClose} isVisible={visible}   className="flex-col items-center justify-start " >
        <div className="flex flex-row w-full h-10 bg-[#00000069] items-center  justify-end p-[10px_20px] " >
            <DeleteFilled  onClick={del_asset} className='cursor-pointer mr-5 text-red-600 ' />
            <CloseOutlined onClick={onClose} className="cursor-pointer text-white " />
        </div>
        <div className="flex flex-row w-full h-full items-center justify-center">
            <Image preview={false} src={image} width={400} height="auto" alt={"image preview"} />
        </div>
    </BaseModalContainer>
  )
}

export default ImagePreview