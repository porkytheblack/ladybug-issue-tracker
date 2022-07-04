import React from 'react'
import dynamic from 'next/dynamic'
const Quill = dynamic(()=>import("react-quill"), {
    ssr: false
})
import "react-quill/dist/quill.bubble.css"
import { Text } from '../../pages/_app'

function Message({subject, msg_content}:{subject: string, msg_content: string}) {
  return (
    <div className="flex flex-col items-start justify-start">
        <Text className="w-full m-[10px_0px] items-center text-center font-semibold !text-black text-xl" >
            {subject}
        </Text>
        <Quill className='w-full ' theme='bubble' defaultValue={msg_content} value={msg_content} />
    </div>
  )
}

export default Message