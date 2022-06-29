import { Col, Empty, Row } from 'antd'
import React, { useState } from 'react'
import { severity_types } from '../../../globaltypes'
import useIssues from '../../../hooks/useIssues'
import { Text } from '../../../pages/_app'
import BaseCard from '../../Containers/BaseCard'

function SeverityCard() {
    var n = (b: number) => Math.floor((b/total_issues)*100)
     const {total_issues, critical, low, high, medium} = useIssues()

    const SeverityStat = (sev: severity_types, num: number) =>(
        <Col span={24} className="!flex pl-3 mt-3 !flex-row !items-start !justify-between" >
                <div style={{background:  sev == "critical" ? "var(--ap-severity-critical)" : sev == "high" ? "var(--ap-severity-high)" : sev== "medium" ? "var(--ap-severity-medium)" : "var(--ap-severity-low)"}} className="flex mt-1 mr-2 w-2 h-2 rounded-full  ">
                </div>
                <div className="flex flex-col items-start justify-start">
                    <Text className="mb-2 !text-xs capitalize" >
                        {sev}
                    </Text>
                    <Text className="!text-xs" >
                        {n(num)} %
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
                width: `${n(critical)}%`
            }} className="flex h-full flex-row"></div>
            <div style={{
                backgroundColor: "var(--ap-severity-high)",
                width: `${n(high)}%`
            }} className="flex h-full flex-row"></div>
            <div style={{
                backgroundColor: "var(--ap-severity-medium)",
                width: `${n(medium)}%`
            }} className="flex h-full flex-row"></div>
            <div style={{
                backgroundColor: "var(--ap-severity-low)",
                width: `${n(low)}%`
            }} className="flex h-full flex-row"></div>
        </div>
        {total_issues == 0 ? (
            <Empty description="No issues" />
        ) :<Row className="w-full" align="top" justify='space-between' >
            {SeverityStat("critical", critical)}
            {SeverityStat("high", high)}
            {SeverityStat("medium", medium)}
            {SeverityStat("low", low)}
        </Row>}
    </BaseCard>
  )
}

export default SeverityCard