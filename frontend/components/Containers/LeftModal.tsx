import { BugOutlined, BulbOutlined, CloseOutlined, EditOutlined, PaperClipOutlined, QuestionOutlined, SaveOutlined, SearchOutlined, StarOutlined, SyncOutlined, ToolOutlined, UserAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Checkbox, Divider, Dropdown, Empty, notification, Select, Steps, Tabs, Tag, Tooltip, Typography } from 'antd'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useIssue from '../../hooks/useIssue'
import useTeam from '../../hooks/useTeam'
import StatusTag from '../Tags/StatusTag'
import BaseModalContainer from './BaseModalContainer'
const ReactQuill = dynamic(()=>import("react-quill"), {ssr: false})
import "react-quill/dist/quill.snow.css"
import "react-quill/dist/quill.bubble.css"
import dynamic from 'next/dynamic'
import Image from 'next/image'
import MultipleSelectDropdown from '../Dropdowns/MultipleSelectDropdown'
import { generateRandomColor } from '../../helpers/randomColor'
import { useAtom } from 'jotai'
import { LeftModalVisibility, tick_issue, tick_up_issue } from '../../jotai/state'
import axios from 'axios'
import { backend_url, global_tags } from '../../globals'
import CommentInput from '../Input/CommentInput'
import BaseButtonDropdown from '../Dropdowns/BaseButtonDropdown'
import LeftModalTopBar from './LeftModalTopBar'
import DescriptionInput from '../Input/DescriptionInput'
import { isUndefined } from 'lodash'
import TagContainer from '../Tags/TagContainer'
import ModalLeft from './ModalLeft'
import GeneralAvatar from '../OneJob/GeneralAvatar'
import CommentsSection from './CommentsSection'

const {Text} = Typography 
const {TabPane} = Tabs

function LeftModalContainer() {
    const [edit_description, set_edit_description] = useState<boolean>(false)
    const [visible, set_visible] = useAtom(LeftModalVisibility)      
    const {creator, comments, severity, status, tags, description, summary, type, assignees, _id, loading, is_error} = useIssue()
    const {members} = useTeam()
    const [, up] = useAtom(tick_up_issue)
   

    useEffect(()=>{
        const target = document.querySelector("#leftmodal")
        if(target !== null){
            const base = document.querySelector("#basemodal_mask")
            if(base){
                base.addEventListener("click", (e)=>{
                    if(!e.composedPath().includes(target)){
                        if(visible){
                            set_visible(false)
                        }
                    }
                })
            }
        }
       
    }, [,loading, is_error, _id])


    

  return (
    <BaseModalContainer  hide={()=>{set_visible(false)}} className='flex-row items-start justify-end' isVisible={visible} >
        <div id="leftmodal" className="flex flex-col items-center relative justify-start  !bg-[#F2F5FA]   w-[90%] h-full ">
            <LeftModalTopBar/>
        <ChildrenContainer className="flex  overflow-y-scroll flex-col with-scrollbar items-center h-[83vh] w-full p-3  m-0 justify-start bg-white">
        <div  className="flex flex-row w-full pb-10 h-full !bg-white items-start justify-between">
            <div className="flex flex-col items-center justify-start w-[60%] ">
                <DescriptionInput/>
                <div className="flex flex-row w-full items-center justify-between mt-2 p-2 ">
                        <div className="flex flex-col items-start justify-start">
                            <Text className="font-medium text-lg !text-black mb-2 " >
                                Assignees
                            </Text>
                            <Avatar.Group>
                                {
                                    assignees?.map(({avatar, user_name})=>(
                                        <GeneralAvatar avatar={avatar} user_name={user_name}  />
                                    ))
                                }
                                <Dropdown arrow overlay={<div className="p-5 bg-white shadow-xl " >
                                    {members?.filter(({user_name}) => !assignees?.map((val)=>val.user_name).includes(user_name as any)).length > 0 ? <Checkbox.Group>
                                        {members.map(({user_name})=>(
                                            !assignees?.map(({user_name})=>user_name).includes(user_name as any) &&
                                            <Checkbox value={user_name} >
                                                {user_name}
                                            </Checkbox>
                                        ))}
                                    </Checkbox.Group> : <Empty/> }
                                </div>} >
                                    <Avatar className="!flex flex-row cursor-pointer !bg-yellow-600 items-center justify-center" size="large" icon={<UserAddOutlined/>} />
                                </Dropdown>
                            </Avatar.Group>
                            
                        </div>
                        
                            
                            <TagContainer />
                </div>

                <Tabs defaultActiveKey='activity' defaultChecked={true} className="w-full h-full" >
                    <TabPane key="activity" tabKey="activity" tab={
                        <div className='flex flex-row items-center justify-center' >
                            <SyncOutlined/>
                            <Text>
                                Activity
                            </Text>
                        </div>
                    } >
                        <CommentsSection/>
                    </TabPane>
                    <TabPane key="attachments" tabKey="attachments" tab={
                        <div className='flex flex-row items-center justify-center' >
                            <PaperClipOutlined/>
                            <Text>
                                Attachments
                            </Text>
                        </div>
                    } >
                        
                    </TabPane>
                </Tabs>
                
            </div>
            <div className="flex flex-col min-w-[30%]  h-full items-center justify-start">
                    <ModalLeft/>
            </div>
        </div>
        
        </ChildrenContainer>  
        </div>
    </BaseModalContainer>
  )
}

export default LeftModalContainer

const ChildrenContainer = styled.div`
`