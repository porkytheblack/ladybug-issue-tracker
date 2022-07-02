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
                
                <Avatar size="large" style={{backgroundColor: generateRandomColor()}} >
                    {isUndefined(user_name) ? "" : user_name[0]?.toLocaleUpperCase()}
                </Avatar>
                
            ) : (
                <div className="flex flex-row items-center rounded-full justify-center rounde-full w-[40px] h-[40px] overflow-hidden " >
                    <Image width={40} height={40} src={avatar} referrerPolicy="no-referrer" />
                </div>
            )
        }
    </Tooltip> 
  )
}

export default GeneralAvatar