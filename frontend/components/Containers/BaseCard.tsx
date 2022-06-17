import { Col } from 'antd'
import React, { ReactNode } from 'react'

function BaseCard({children,span, className}: {children: ReactNode | ReactNode[],span: number, className: string}) {
  return (
    <Col  span={span} className={`${className} border-[0.7px] border-solid p-[1rem_2rem] rounded-[.833rem]   border-[#E4F1FF]`} >
        {children}
    </Col>
  )
}

export default BaseCard