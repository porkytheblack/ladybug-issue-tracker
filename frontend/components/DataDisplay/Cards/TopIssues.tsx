import { Col, Divider, Progress, Row, Select } from 'antd'
import { atom, useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { is_def_string } from '../../../helpers'
import useIssues from '../../../hooks/useIssues'
import { Option, Text } from '../../../pages/_app'
import BaseCard from '../../Containers/BaseCard'
import EmptyAndLoading from '../../Containers/EmptyAndLoading'


function TopIssues() {
    const [filter, set_filter] = useState<string>("all")
    const {top_issues} = useIssues()
    const p = (s: string): number =>{
        if(s == "new") return 0
        if(s == "in progress") return 40
        if(s == "fixed") return 100
        if(s == "closed") return 100
        if(s == "not fixed") return 0
        if(s == "cancelled") return 0
        if(s == "released") return 100
        return 10
    }
    useEffect(()=>{
        console.log(filter)
        console.log(top_issues)
    }, [filter])
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
                <Select onChange={(val )=>{
                    console.log(val)
                    set_filter(val as any)
                }} className="w-full" size='small' defaultValue={["all"]} >
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
            </Col>
        </Row>
        <Row align="top" justify='space-between' className='mt-5' >
            <EmptyAndLoading empty_description='No issuess' className="w-full h-full flex flex-col items-center justify-start" >
            {
                top_issues?.filter(({severity})=> filter == severity || filter == "all" ).map(({summary, status})=>(
                    <>
                        <Col className="!flex !flex-row items-center w-full" span={24} >
                        <Text className="text-sm mr-5 !flex flex-row items-center  font-semibold !text-black" >
                                <Text>
                                    {summary}
                                </Text>
                                <Divider  type='vertical' />
                                <Text>
                                    {status}
                                </Text>
                                
                            </Text>
                            <Progress percent={p(is_def_string(status))} showInfo={false} />
                        </Col>
                        <Divider/>
                    </>
                ))
            }
            </EmptyAndLoading>
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