import { Button, Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import useIssues from '../../hooks/useIssues'
import CommentInput from '../Input/CommentInput'
import GeneralAvatar from '../OneJob/GeneralAvatar'
const ReactQuill = dynamic(()=>import("react-quill"), {ssr: false})
import "react-quill/dist/quill.snow.css"
import "react-quill/dist/quill.bubble.css"
import dynamic from 'next/dynamic'

function CommentsSection() {
    const [active_comment, set_active_comment] = useState<number>(999)
    const {comments, tick} = useIssues()
    useEffect(()=>{

    }, [,tick])
  return (
    <div className="flex flex-col w-full h-full pt-5 pb-8" >
        <CommentInput/>
        <div className="flex flex-col items-start justify-start mt-4 w-full">
            <Steps direction='vertical' current={comments?.length} status='finish' >
                {
                    comments?.map(({author, description}, key)=>{
                    return (
                        <Steps.Step icon={
                            <GeneralAvatar avatar={author.avatar} user_name={author.user_name} />
                        } description={
                            <div className={`flex flex-col items-center transition-all duration-300 justify-start relative ${ active_comment !== key ? "h-[150px]": "h-full"} overflow-hidden rounded-md border-[0.2px]  border-gray-100 !bg-[#F2F5FA]   w-full`}>
                                <ReactQuill className='w-full' defaultValue={""} theme="bubble" value={typeof description !== "undefined" ? description : ""} readOnly  />
                                {active_comment !== key && <div className="absolute bottom-3 right-[50%] flex flex-row items-center bg-gradient-to-b bg-transparent">
                                        <Button onClick={()=>set_active_comment(key)} style={{backgroundColor: "blue", color: "white"}} >
                                            Read More
                                        </Button>
                                </div>}
                            </div>
                        } />
                    )})
                }
            </Steps>
        </div>
    </div>
  )
}

export default CommentsSection