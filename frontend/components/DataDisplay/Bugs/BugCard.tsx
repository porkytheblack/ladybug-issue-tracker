import { MessageFilled } from '@ant-design/icons'
import { Avatar, Col, Divider, Row, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components'
import BaseTag from '../../Tags/BaseTag'
import StatusTag from '../../Tags/StatusTag'


const {Text} = Typography

function BugCard() {
  return (
    <BugCardContainer className="flex cursor-pointer w-full flex-col items-center justify-start bg-white rounded-[5px] p-5 " >
            <Row align="middle"  justify='space-between' className="w-full h-full " >
                <Col span={3} className="!flex !flex-row !items-center !justify-center " >

                    <Text className="font-medium uppercase !text-black text-sm " >
                        Bug1
                    </Text>
                    
                </Col>
                <Col span={3} >
                    <BaseTag severity='high' >
                        High
                    </BaseTag>
                </Col>
                <Col span={8} >
                    <Text className="text-md mb-2 font-semibold !text-black" >
                        Read me first ⭐
                    </Text>
                    <div className="flex flex-row mb-1 items-start justify-between">
                        <Text className="text-sm" >
                            <Text>
                                Project
                            </Text>
                            <Divider type='vertical' />
                            <Text className="font-semibold" >
                                bugtracker
                            </Text>
                        </Text>
                        <Text className="text-sm" >
                            <Text>
                                Sprint
                            </Text>
                            <Divider type='vertical' />
                            <Text className="font-semibold" >
                                Frontend
                            </Text> 
                        </Text>
                    </div>

                    <Text className='!text-xs' >
                        Added 11hrs ago
                    </Text>
                    
                </Col>
                <Col span={3} >
                        <StatusTag>
                            New
                        </StatusTag>
                </Col>
                <Col span={3} >
                <Avatar src="https://joeschmoe.io/api/v1/jess" className="!ml-5" />
                </Col>
            </Row>
            <Row align='middle'  justify="start" className="p-[10px] w-full" >
                <Col className="!flex flex-row items-center justify-start" >
                    <MessageFilled style={{color: "var(--ceruleanblue)"}} />
                    <Text className="ml-2 !text-black " >
                        3/3
                    </Text>
                </Col>
            </Row>
    </BugCardContainer>
  )
}

export default BugCard

const BugCardContainer = styled.div`
    :hover{
        box-shadow: 0 5px 11px rgb(13 61 98 / 19%);
    }

    transition: box-shadow .2s ease-in;
    
    
`