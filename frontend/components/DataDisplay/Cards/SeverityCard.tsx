import { Col, Row } from 'antd'
import React, { useState } from 'react'
import { severity_types } from '../../../globaltypes'
import { Text } from '../../../pages/_app'
import BaseCard from '../../Containers/BaseCard'

function SeverityCard() {
    const [total_issues, set_total_issues] = useState<number>(4)

    const SeverityStat = (sev: severity_types, num: number) =>(
        <Col span={12} className="!flex pl-3 mt-3 !flex-row !items-start !justify-between" >
                <div style={{background:  sev == "critical" ? "var(--ap-severity-critical)" : sev == "high" ? "var(--ap-severity-high)" : sev== "medium" ? "var(--ap-severity-medium)" : "var(--ap-severity-low)"}} className="flex mt-1 mr-2 w-2 h-2 rounded-full  ">
                </div>
                <div className="flex flex-col items-start justify-start">
                    <Text className="mb-2 !text-xs capitalize" >
                        {sev}
                    </Text>
                    <Text className="!text-xs" >
                        {num/total_issues} %
                    </Text>
                </div>
                <Text style={{color: sev == "critical" ? "var(--ap-severity-critical)" : sev == "high" ? "var(--ap-severity-high)" : sev== "medium" ? "var(--ap-severity-medium)" : "var(--ap-severity-low)"}} className="text-3xl font-medium " >
                    {num}
                </Text>
        </Col>      
    )

    
  return (
    <BaseCard span={6} className="bg-white !h-full " >
        <div className="flex mb-6 flex-row items-center justify-start">
                <Text className="font-medium text-lg !text-black"  >
                    Severity
                </Text>
        </div>
        <div className="flex flex-row h-[30px] w-full items-center justify-start">
            <div style={{
                backgroundColor: "var(--ap-severity-critical)",
                width: "25%"
            }} className="flex h-full flex-row"></div>
            <div style={{
                backgroundColor: "var(--ap-severity-high)",
                width: "25%"
            }} className="flex h-full flex-row"></div>
            <div style={{
                backgroundColor: "var(--ap-severity-medium)",
                width: "25%"
            }} className="flex h-full flex-row"></div>
            <div style={{
                backgroundColor: "var(--ap-severity-low)",
                width: "25%"
            }} className="flex h-full flex-row"></div>
        </div>
        <Row className="w-full" align="top" justify='space-between' >
            {SeverityStat("critical", 1)}
            {SeverityStat("high", 1)}
            {SeverityStat("medium", 1)}
            {SeverityStat("low", 1)}
        </Row>
    </BaseCard>
  )
}

export default SeverityCard