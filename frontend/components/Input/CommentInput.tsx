import React, { useState } from 'react'
const ReactQuill = dynamic(()=>import("react-quill"), {ssr: false})
import "react-quill/dist/quill.snow.css"
import "react-quill/dist/quill.bubble.css"
import dynamic from 'next/dynamic'
import { Text } from '../../pages/_app'
import { Button, notification } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import axios from 'axios'
import { backend_url } from '../../globals'
import { useAtom } from 'jotai'
import { activeIssueAtom, tick_up } from '../../jotai/state'

function CommentInput() {
    const [comment, set_comment] = useState<string>("")
    const [current_issue, ] = useAtom(activeIssueAtom)
    const [, up] = useAtom(tick_up)
    const submit_comment = () =>{
        axios.post(`${backend_url}/comment/${current_issue}`, {
            description: comment
        }, {
            withCredentials: true
        }).then(()=>{
            up()
            notification.success({
                message: "Comment added successfully",
                key: "comment_success"
            })
            set_comment("")
        }).catch((e)=>{
            console.log(e)
            notification.error({
                message: "An error occured",
                key: "add_comment_error"
            })
        })
    }
  return (
    <div className="flex flex-col mb-3 items-start justify-start w-full">
         <Text className='!text-black mb-3 ' >
           Add a comment
        </Text>
        <div className="flex flex-row w-full mb-10">
        <ReactQuill value={comment} defaultValue="" onChange={set_comment} theme="snow" preserveWhitespace={true} className='w-full' />
        </div>

        <div className="flex flex-row w-full items-center justify-start mt-2">
            <Button onClick={submit_comment} icon={<SaveOutlined/>} className="flex mr-4 flex-row items-center justify-between" >
                Save
            </Button>
        </div>
    </div>
  )
}

export default CommentInput