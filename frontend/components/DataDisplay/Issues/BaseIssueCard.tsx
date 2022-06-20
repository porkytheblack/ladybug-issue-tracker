import { BugOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import React, { ReactNode } from 'react'
import { Text } from '../../../pages/_app'
import BaseCard from '../../Containers/BaseCard'

function BaseIssueCard({icon, num, title}: {icon: ReactNode | string ; num: string | number; title: string}) {
  return (
    <BaseCard span={5} className="bg-white !flex !flex-row items-start justify-start " >
        <Avatar icon={icon} className="!flex !flex-row items-center justify-center" size="large" />
        <div className="flex flex-row ml-3 h-auto items-center justify-start">
            <Text className="font-medium text-3xl !text-black mr-2 " >
                    {num}
            </Text>
            <Text>
                {title}
            </Text>
        </div>
    </BaseCard>
  )
}

export default BaseIssueCard