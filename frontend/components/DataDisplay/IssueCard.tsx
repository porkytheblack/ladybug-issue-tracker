import { EditFilled, EditOutlined, ExclamationCircleOutlined, IssuesCloseOutlined } from '@ant-design/icons'
import { Col, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components'

const {Text} = Typography

function IssueCard({color, content, num}:{color: string, content: "Total" | "Opened" | "Closed", num: number}) {
  return (
    <CustomGlanceCard span={7} className=" !h-[130px] bg-white"  >
        <div className="flex flex-row h-full w-full items-start justify-between p-[10px]">
            <div className="flex flex-col items-start justify-between" >
                <Text style={{color}} className={`!text-[18px]  `}  >
                    {content == "Total" ? "Total Issues" : content == "Closed" ? "Issues Closed" : "Issues Opened"}
                    
                </Text>
                <Text className="!text-black !text-[24px] !font-medium " >
                    {num}
                </Text>
                <Text className='text-[10px] text-left' >
                    {content == "Total" ? "Great job! let's start fixing them." : content == "Closed" ? "We have fixed your issues." : "Issues are being resolved."}
                </Text>
            </div>
            <div style={{background: color}} className="flex rounded-full p-2 flex-row items-center justify-center ">
            {content == "Opened" ?<EditOutlined className="text-[24px]" style={{color: "white"}} /> : content == "Closed" ? <IssuesCloseOutlined className="text-[24px]" style={{color: "white"}} /> : <ExclamationCircleOutlined className="text-[24px]" style={{color: "white"}} /> }
            </div>
            
        </div>
    </CustomGlanceCard>
  )
}

export default IssueCard

const CustomGlanceCard = styled(Col)`
    border-radius: 8px;
    border: .7px solid #E2E2E2;
    overflow: hidden;
    padding: 15px;
    height: 100%;
`