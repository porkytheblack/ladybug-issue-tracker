import { Col, Progress, Row, Select } from 'antd'
import React from 'react'
import { Option, Text } from '../../../pages/_app'
import BaseCard from '../../Containers/BaseCard'

function IssueStatusCard() {
  return (
    <BaseCard span={8}  className="flex flex-col bg-white items-start justify-start !h-full" >
        <div className="flex flex-row mb-5 items-center justify-between">
                <Text className="font-medium text-lg !text-black"  >
                    Issue Status
                </Text>
                <Select size='small' defaultValue={["all"]} className="w-[30%]" >
                    <Option value="all" >
                        All
                    </Option>
                    <Option value="critical" >
                        Critical
                    </Option>
                    <Option value="high" >
                        High
                    </Option>
                    <Option value="medium" >
                        Medium
                    </Option>
                    <Option value="low" >
                        Low
                    </Option>
                </Select>
        </div>
        <div className="flex flex-col items-start w-full justify-start">
            {[
                {
                    name: "New",
                    val: 40
                },
                {
                    name: "In Progress",
                    val: 30
                },
                {
                    name: "Fixed",
                    val: 20
                },
                {
                    name: "Closed",
                    val: 60
                },
                {
                    name: "Released",
                    val: 50
                }
            ].map(({name, val})=>(
                <Row className="w-full mb-1 " align="middle" justify='space-between' >
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