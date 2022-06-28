import { Typography } from 'antd'
import React from 'react'
import { CommentInterface, extCommentInterface } from '../../../globaltypes'
import BugUpdateItem from './BugUpdateItem'

const {Text} = Typography

function BugUpdate({comment, num}: {comment: extCommentInterface, num: number}) {
  return (
    <div className="flex flex-col items-start justify-start w-full ">
        <div className="flex flex-row items-center justify-start w-full">
            <Text className="text-sm mb-2 font-medium" >
                <Text className="!text-[#259AFF] uppercase mr-2 " >
                        Issue {num + 1}
                </Text>
                <Text className='!text-black' >
                    {comment?.summary}
                </Text>
            </Text>
            
        </div>
        <ul className="flex flex-col w-full items-start justify-start pl-5" >
                <BugUpdateItem comment={comment} />
        </ul>
    </div>
  )
}

export default BugUpdate