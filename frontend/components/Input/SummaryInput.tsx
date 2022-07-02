import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Input, notification } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backend_url } from '../../globals'
import { is_def_string } from '../../helpers'
import useIssue from '../../hooks/useIssue'
import { Text } from '../../pages/_app'


function SummaryInput() {
    const {summary, _id} = useIssue()
    const [new_summary, set_new_summary] = useState<string>(is_def_string(summary))
    const [edit, set_edit] = useState<boolean>(false)
    const [editing, set_editing] = useState<boolean>(true)


    useEffect(()=>{
        set_new_summary(is_def_string(summary))
    }, [, edit])

    const handle_submit = () =>{
        axios.put(`${backend_url}/issue/${is_def_string(_id)}`, {
            summary: new_summary
        }, {
            withCredentials: true
        }).then(()=>{
            set_edit(false)
            notification.success({
                message: "Success",
                key: "success"
            })
        }).catch((e)=>{
            set_edit(false)
            notification.error({
                message: "An error occured",
                key: "message_error"
            })
        })
    }
    

    return (
        <div className="flex flex-row items-center justify-start">
            {!edit && <div className="flex flex-row items-center justify-start">
                <Text className="text-xl !font-medium !text-black"  >
                    {summary}
                </Text>
                <EditOutlined onClick={()=>set_edit(true)} className='ml-2' />
            </div>}
            {edit && <div className="flex flex-row items-center justify-start">
                <Input onPressEnter={handle_submit} defaultValue={new_summary} bordered={false} value={new_summary} onChange={(e)=>set_new_summary(e.target.value)}  />
                <CloseOutlined onClick={handle_submit} className="ml-2" />
            </div>}
        </div>
    )
}

export default SummaryInput