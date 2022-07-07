import { BugOutlined, BulbOutlined, CloseOutlined, EditOutlined, PaperClipOutlined, QuestionOutlined, SaveOutlined, SearchOutlined, StarOutlined, SyncOutlined, ToolOutlined, UserAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Checkbox, Divider, Drawer, Dropdown, Empty, notification, Select, Steps, Tabs, Tag, Tooltip, Typography } from 'antd'
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
import Attachments from '../DataDisplay/Container/Attachments'
import AssigneesComponent from './Assignees'

const {Text} = Typography 
const {TabPane} = Tabs

function LeftModalContainer() {
    const [edit_description, set_edit_description] = useState<boolean>(false)
    const [visible, set_visible] = useAtom(LeftModalVisibility)      
    const {creator, comments, severity, status, tags, description, summary, type, assignees, _id, loading, is_error} = useIssue()
    const {members} = useTeam()
    
   

    


    

  return (
    <Drawer headerStyle={{
        background: "#f3f3f3"
    }} title={
        <LeftModalTopBar/>
    } className='!p-0'  onClose={()=>{set_visible(false)}}  width="80vw" destroyOnClose visible={visible} >

            
        <div  className="flex flex-row w-full pb-10 h-full !bg-white items-start justify-between">
            <div className="flex flex-col items-center justify-start w-[60%] ">
                <DescriptionInput/>
                <div className="flex flex-row w-full items-center justify-between mt-2 p-2 ">
                       <AssigneesComponent/>
                        
                            
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
                           <Attachments/>
                    </TabPane>
                </Tabs>
                
            </div>
            <div className="flex flex-col min-w-[30%]  h-full items-center justify-start">
                    <ModalLeft/>
            </div>
        </div>     
    </Drawer>
  )
}

export default LeftModalContainer

const ChildrenContainer = styled.div`
`