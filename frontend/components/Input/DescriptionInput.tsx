import React, { useEffect, useState } from 'react'
const ReactQuill = dynamic(()=>import("react-quill"), {ssr: false})
import "react-quill/dist/quill.snow.css"
import "react-quill/dist/quill.bubble.css"
import dynamic from 'next/dynamic'
import { Text } from '../../pages/_app'
import { Button, Divider, notification } from 'antd'
import { AlignLeftOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons'
import axios from 'axios'
import { backend_url } from '../../globals'
import { useAtom } from 'jotai'
import useIssue from '../../hooks/useIssue'
import { is_def_string } from '../../helpers'

function DescriptionInput() {
    const [edit_description, set_edit_description] = useState(false)
    const {description, _id} = useIssue()
    const [desc, set_desc] = useState<string>(is_def_string(description))

    useEffect(()=>{
        set_desc(is_def_string(description))
    }, [, description])

    const submit = () =>{
        if(desc  == description) return notification.info({message: "Nothing to submit", key: "no_change_no_submit"})
        axios.put(`${backend_url}/issue/${_id}`, {
            description: desc
        }, {
            withCredentials: true
        }).then(()=>{
            notification.success({
                message: "Change made successfully",
                key: "success_change"
            })
        }).catch((e)=>{
            console.log(e)
            notification.error({
                message: "An error occured",
                key: "submissio_error"
            })
        })
    }

  return (
    <div className="w-full flex flex-col bg-slate-100 items-start justify-start" >
        <div className="flex flex-row mt-2 p-4 w-full items-center justify-start">
                 <a className='!border-none !bg-none flex flex-row items-center justify-between'  onClick={()=>set_edit_description(!edit_description)}>
                        {edit_description && <AlignLeftOutlined className='!text-black' />}
                        <Text className="!text-black  mr-5 ml-2 " >
                            { !edit_description ? "Edit Description" : "Description" }
                        </Text>
                        {!edit_description && <EditOutlined/>}
                        
                    </a>
                </div>
                <div className="flex flex-col with-scrollbar w-full items-center justify-start h-[400px] overflow-y-scroll ">
                <ReactQuill  className="w-full !text-black h-full"  theme={`${edit_description ? "snow" : "bubble"}`} preserveWhitespace={true} readOnly={!edit_description} value={ desc } onChange={set_desc}  />
                </div>   
                <Divider className='!mb-2' />
                {edit_description && <div className="flex flex-row items-center justify-end w-full">
                    <Button onClick={submit} icon={<SaveOutlined/>} className="mr-3 !flex !flex-row !items-center !justify-between" >
                        Save
                    </Button>
                </div>}
    </div>
  )
}

export default DescriptionInput