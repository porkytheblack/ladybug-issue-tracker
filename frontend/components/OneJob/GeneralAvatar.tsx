import { Avatar, Tooltip } from 'antd'
import { isUndefined } from 'lodash'
import Image from 'next/image'
import React from 'react'
import { generateRandomColor } from '../../helpers/randomColor'

function GeneralAvatar({avatar, user_name}:{avatar?: string, user_name?: string}) {
  return (
    <Tooltip className='cursor-pointer' title={user_name} >
        {
            (isUndefined(avatar) || avatar?.length == 0) ? (
                
                <Avatar size="large" className='!bg-yellow-600' style={{width: "40px", height: "40px"}} >
                    {isUndefined(user_name) ? "" : user_name[0]?.toLocaleUpperCase()}
                </Avatar>
                
            ) : (
                <div className="flex flex-row items-center bg-yellow-600 rounded-full justify-center rounde-full w-[40px] h-[40px] overflow-hidden " >
                    <Image width={40} height={40} src={avatar} referrerPolicy="no-referrer" />
                </div>
            )
        }
    </Tooltip> 
  )
}

export default GeneralAvatar