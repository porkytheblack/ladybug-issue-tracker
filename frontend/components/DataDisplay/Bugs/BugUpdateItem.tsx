import { Avatar, Typography } from 'antd'
import dayjs from 'dayjs'
import Image from 'next/image'
import React from 'react'
import { extCommentInterface } from '../../../globaltypes'
import { is_def_string } from '../../../helpers'
import BugComment from './BugComment'
import relativeTime from 'dayjs/plugin/relativeTime';
import { isUndefined } from 'lodash'
dayjs.extend(relativeTime)

const {Text} = Typography

function BugUpdateItem({comment}:{comment: extCommentInterface}) {
  return (
    <li className="w-full mt-3 flex flex-col items-start justify-start" >
        <div className="flex flex-row items-center justify-start">
            <div className="flex flex-row rounded-full h-10 w-10 overflow-hidden ">
            <Image src={isUndefined(comment?.author?.avatar) ? `https://joeschmoe.io/api/v1/${comment?.author?.avatar}` : comment?.author?.avatar } height={40} width={40} />
            </div>
            <Text className="text-sm !text-black ml-5 font-medium" >
                @ {comment?.author?.user_name}
                <Text className="font-normal ml-5 text-xs text-[#3a3b45] " >
                    {dayjs(comment?.lastModified).fromNow()}
                </Text>
            </Text>
        </div>
        <div className="flex pl-9 flex-row items-center w-full justify-start">
        <BugComment comment={comment} />
        </div>
        
    </li>
  )
}

export default BugUpdateItem