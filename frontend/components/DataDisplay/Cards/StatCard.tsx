import { Progress } from 'antd'
import React from 'react'
import { Text } from '../../../pages/_app'

function StatCard({percent, description}: {percent: number, description: string}) {
  return (
    <div className="flex flex-col p-5  items-center justify-start">
        <Progress  strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}  percent={Math.floor(percent)}  type="dashboard"  />
      <Text className="!text-black text-lg font-semibold  " >
         {description}
      </Text>
    </div>
  )
}

export default StatCard