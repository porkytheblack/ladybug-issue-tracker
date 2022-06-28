import { EditOutlined, MessageFilled, PaperClipOutlined, SaveOutlined, SyncOutlined, UserAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Checkbox, Col, Divider, Dropdown, Empty, Row, Tabs, Tag, Tooltip, Typography } from 'antd'
import { useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'
import { IssueInterface } from '../../../globaltypes'
import useIssue from '../../../hooks/useIssue'
import useProject from '../../../hooks/useProject'
import { activeIssueAtom, LeftModalVisibility } from '../../../jotai/state'
import LeftModalContainer from '../../Containers/LeftModal'
import BaseTag from '../../Tags/BaseTag'
import StatusTag from '../../Tags/StatusTag'



const {Text} = Typography
const {TabPane} = Tabs

function BugCard({issue, count}:{issue: IssueInterface, count: number}) {
    const [is_modal_visible, set_is_modal_visible] = useState<boolean>(false)
    const [, set_active_issue] = useAtom(activeIssueAtom)
    const [visible, set_visible] = useAtom(LeftModalVisibility)
    
    const hide = () =>{
        set_is_modal_visible(false)
    }
    const show = () =>{
        set_visible(true)
    }
    const {project} = useProject()

    const card_click = () =>{
        set_active_issue(issue._id)
        show()
    }

    
    
  return (
    <>
    <BugCardContainer onClick={card_click} className="flex cursor-pointer w-full flex-col items-center justify-start bg-white rounded-[5px] p-5 " >
            
            <Row align="middle"  justify='space-between' className="w-full h-full " >
                <Col span={3} className="!flex !flex-row !items-center !justify-center " >
                    <Text className="font-medium uppercase !text-black text-sm " >
                        Issue {count + 1}
                    </Text>
                </Col>
                <Col span={3} >
                    <BaseTag severity={"high"} >
                        {issue?.severity}
                    </BaseTag>
                </Col>
                <Col span={8} >
                    <Text className="text-md mb-2 font-semibold !text-black" >
                        {issue?.summary}
                    </Text>
                    <div className="flex flex-row mb-1 items-start justify-between">
                        <Text className="text-sm" >
                            <Text>
                                Project
                            </Text>
                            <Divider type='vertical' />
                            <Text className="font-semibold" >
                                {project.project_name}
                            </Text>
                        </Text>
                        <Text className="text-sm" >
                            <Text>
                                Platform
                            </Text>
                            <Divider type='vertical' />
                            <Text className="font-semibold capitalize " >
                                {project.platform}
                            </Text> 
                        </Text>
                    </div>

                    <Text className='!text-xs' >
                        Added 11hrs ago
                    </Text>
                </Col>
                <Col span={3} >
                        <StatusTag>
                            {issue?.status}
                        </StatusTag>
                </Col>
                <Col span={3} >
                <Avatar.Group>
                    {
                        issue?.assignees?.map(({user_name, avatar})=>(
                            <Tooltip title={user_name} >
                                <div className="flex flex-row items-center justify-center overflow-hidden rounded-full h-[40px] w-[40px] ">
                                    <Image src={typeof avatar !== "undefined" ? avatar : `https://joeschmoe.io/api/v1/${user_name}`} width={40} height={40} referrerPolicy="no-referrer" />
                                </div>
                            </Tooltip>
                        ))
                    }
                </Avatar.Group>
                </Col>
            </Row>
            <Row align='middle'  justify="start" className="p-[10px] w-full" >
                <Col className="!flex flex-row items-center justify-start" >
                    <MessageFilled style={{color: "var(--ceruleanblue)"}} />
                    <Text className="ml-2 !text-black " >
                        {issue?.comments?.length}
                    </Text>
                </Col>
            </Row>
    </BugCardContainer>
    </>
  )
}

export default BugCard

const BugCardContainer = styled.div`
    :hover{
        box-shadow: 0 5px 11px rgb(13 61 98 / 19%);
    }

    transition: box-shadow .2s ease-in;
    
    
`