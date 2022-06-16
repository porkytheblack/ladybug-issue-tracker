import { Typography } from 'antd'
import Image from 'next/image'
import React from 'react'

const {Text} = Typography

function IllustrationExplanation({children, illustration}:{illustration: string, children: string}) {
  return (
    <div className="flex flex-col items-center justify-center">
            <Image src={`/illustrations/${illustration}.svg`} className="mb-2" width="200px" height="300px" />
            <Text className="text-[24px] font-medium " >
                {children}
            </Text>
    </div>
  )
}

export default IllustrationExplanation