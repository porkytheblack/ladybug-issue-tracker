import { Col, Progress, Row, Select } from 'antd'
import React from 'react'
import useIssues from '../../../hooks/useIssues'
import { Option, Text } from '../../../pages/_app'
import BaseCard from '../../Containers/BaseCard'

function IssueStatusCard() {
    var n = (b: number): number =>{
        return Math.floor((b/total_issues) *100)
    }
    const {new_issues, fixed, cancelled, closed_issues, not_fixed, ongoing_issues, released, total_issues} = useIssues()
  return (
    <BaseCard span={8}  className="flex flex-col bg-white items-start justify-start !h-full" >
        <div className="flex flex-row mb-5 items-center justify-between">
                <Text className="font-medium text-lg !text-black"  >
                    Issue Status
                </Text>
        </div>
        <div className="flex flex-col items-start w-full justify-start">
            {[
                {
                    name: "New",
                    val: n(new_issues)
                },
                {
                    name: "In Progress",
                    val: n(ongoing_issues)
                },
                {
                    name: "Fixed",
                    val: n(fixed)
                },
                {
                    name: "Closed",
                    val: n(closed_issues)
                },
                {
                    name: "Released",
                    val: n(released)
                },
                {
                    name: "Cancelled",
                    val: n(cancelled)
                },
                {
                    name: "Not Fixed",
                    val: n(not_fixed)
                }
            ].map(({name, val})=>(
                <Row  key={name} className="w-full mb-1 " align="middle" justify='space-between' >
                    <Col span={6} >
                        <Text  >
                            {name}
                        </Text> 
                    </Col>
                    <Col span={16} >
                        <Progress strokeColor={{
                            from: "#108ee9",
                            to: "#87d068"
                        }} percent={val} />
                    </Col>
                </Row>
            ))
            }
            
        </div>
    </BaseCard>
  )
}

export default IssueStatusCard