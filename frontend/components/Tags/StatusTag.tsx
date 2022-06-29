import { Typography } from 'antd'
import React, { ReactNode } from 'react'

const {Text} = Typography

function StatusTag({children, color}: {children: string | ReactNode, color?: string}) {
  return (
    <div className="bg-[#ebebeb] flex flex-row items-center justify-center !rounded-[11px] p-[2px_8px] max-w-[100px] " >
        <Text style={{color: typeof color !== "undefined" ? color : "#1ab651"}} className="capitalize text-sm" ellipsis={true} >
            {children}
        </Text>
    </div>
  )
}

export default StatusTag