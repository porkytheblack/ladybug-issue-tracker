import { Typography } from 'antd'
import React from 'react'
import BugUpdateItem from './BugUpdateItem'

const {Text} = Typography

function BugUpdate() {
  return (
    <div className="flex flex-col items-start justify-start w-full ">
        <div className="flex flex-row items-center justify-start w-full">
            <Text className="text-sm mb-2 font-medium" >
                <Text className="!text-[#259AFF] uppercase mr-2 " >
                        Bug3
                </Text>
                <Text className='!text-black' >
                    Updates to Bug Tracker
                </Text>
            </Text>
            
        </div>
        <ul className="flex flex-col items-start justify-start pl-5" >
                <BugUpdateItem/>
        </ul>
    </div>
  )
}

export default BugUpdate