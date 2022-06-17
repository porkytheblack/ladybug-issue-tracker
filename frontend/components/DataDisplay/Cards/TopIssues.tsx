import { Col, Divider, Progress, Row, Select } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Option, Text } from '../../../pages/_app'
import BaseCard from '../../Containers/BaseCard'

function TopIssues() {
  return (
    <BaseCard span={24} className="bg-white mt-4 " >
        <Row align="middle" justify='space-between' className="w-full" >
            <Col span={4} >
                <Text className="font-medium text-lg !text-black " >
                    Top Issues
                </Text>
            </Col>
            <Col span={16} ></Col>
            <Col span={4} >
                <Select className="w-full" size='small' defaultValue={["all"]} >
                    <Option value="all" >
                        All
                    </Option>
                    <Option value="high" >
                        High
                    </Option>
                    <Option value="low" >
                        Low
                    </Option>
                    <Option value="Medium" >
                        Medium
                    </Option>
                </Select>
            </Col>
        </Row>
        <Row align="top" justify='space-between' className='mt-5' >
            <Col className="!flex !flex-row items-center " span={24} >
            <Text className="text-sm mr-5 !flex flex-row items-center  font-semibold !text-black" >
                    <Text>
                        BUG1
                    </Text>
                    <Divider  type='vertical' />
                    <Text>
                        Ongoing
                    </Text>
                    
                </Text>
                <Progress percent={45} showInfo={false} />
                
            </Col>
            <Divider/>
            <Col className="!flex !flex-row items-center " span={24} >
            <Text className="text-sm mr-5 !flex flex-row items-center  font-semibold !text-black" >
                    <Text className="uppercase" >
                        BUG2
                    </Text>
                    <Divider  type='vertical' />
                    <Text>
                        Ongoing
                    </Text>
                    
                </Text>
                <Progress percent={45} showInfo={false} />
                
            </Col>
            <Divider/>
        </Row>
    </BaseCard>
  )
}

export default TopIssues

const ScrollableContainer = styled.div`
    overflow-x: scroll;
    &::-webkit-scrollbar{
        background: none;
        width: 5px;
    }
    &::-webkit-scrollbar-thumb{
        background: #f5f5f5;
        border-radius: 2.5px;
    }
`