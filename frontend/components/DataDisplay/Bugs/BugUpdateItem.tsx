import { Avatar, Typography } from 'antd'
import React from 'react'
import BugComment from './BugComment'

const {Text} = Typography

function BugUpdateItem({}:{}) {
  return (
    <li className="w-full flex flex-col items-start justify-start" >
        <div className="flex flex-row items-center justify-start">
            <Avatar src="https://joeschmoe.io/api/v1/joe" size={'default'}  shape='circle' />
            <Text className="text-sm !text-black font-medium" >
                <Text className=' !text-black capitalize ' >
                    Oliver
                </Text>
                <Text className='font-normal !text-black ml-1    ' >
                    added this issue
                </Text>
                <Text className="font-normal ml-5 text-xs text-[#3a3b45] " >
                    11 hours ago
                </Text>
            </Text>
        </div>
        <div className="flex pl-9 flex-row items-center w-full justify-start">
        <BugComment/>
        </div>
        
    </li>
  )
}

export default BugUpdateItem