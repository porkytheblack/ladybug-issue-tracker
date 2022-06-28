import { CloseOutlined, EditOutlined, PaperClipOutlined, SaveOutlined, SyncOutlined, UserAddOutlined } from '@ant-design/icons'
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
import { LeftModalVisibility } from '../../jotai/state'
import axios from 'axios'
import { backend_url } from '../../globals'

const {Text} = Typography 
const {TabPane} = Tabs

function LeftModalContainer() {
    const [edit_description, set_edit_description] = useState<boolean>(false)
    const [visible, set_visible] = useAtom(LeftModalVisibility)
    const [comment, set_comment] = useState<string>("")
    const [active_comment, set_active_comment] = useState<number>(999)

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
       
    }, [])

    const {creator, comments, severity, status, tags, description, summary, type, assignees, _id} = useIssue()
    const {members} = useTeam()

    const submit_comment = () =>{
        axios.post(`${backend_url}/comment/${_id}`, {
            description: comment
        }, {
            withCredentials: true
        }).then(()=>{
            notification.success({
                message: "Comment added successfully",
                key: "comment_success"
            })
            set_comment("")
        }).catch((e)=>{
            console.log(e)
            notification.error({
                message: "An error occured",
                key: "add_comment_error"
            })
        })
    }

  return (
    <BaseModalContainer  hide={()=>{set_visible(false)}} className='flex-row items-start justify-end' isVisible={visible} >
        <div id="leftmodal" className="flex flex-col items-center relative justify-start  !bg-[#F2F5FA]   w-[90%] h-full ">
            <div  className="flex flex-row items-center   justify-between w-full bg-[#F3F3F3] p-[10px_20px]  border-[1px] border-solid border-[#D3D3D3]  ">
                <a onClick={()=>set_visible(false)} className="flex absolute top-2 right-2 flex-row items-center justify-center">
                    <CloseOutlined/>
                </a>
                <div className="flex flex-col w-1/2 h-full items-start justify-start">
                    <div className="flex flex-row items-center mb-3 justify-start">

                        <Tag className="!bg-blue-800 mr-2 "  color="blue" >
                            <Text className="!text-white uppercase " >
                                    Issue
                            </Text>
                        </Tag>
                        <StatusTag>
                            {status}
                        </StatusTag>


                    </div>

                    <div className="flex flex-row items-center justify-start">
                        <Text className="text-xl !font-medium !text-black "  >
                                {summary}
                        </Text>
                    </div>
                    <div className="flex flex-row items-center justify-start mb-2">
                        <Text className="mr-2" >
                            Project Type
                        </Text>
                        <Select defaultValue={type} >
                            <Select.Option key="bug" >
                                Bug
                            </Select.Option>
                            <Select.Option key="observation" >
                                Observation
                            </Select.Option>
                            <Select.Option key="feature" >
                                Feature
                            </Select.Option>

                        </Select>
                    </div>

                </div>

                <div className="flex flex-col items-end justify-start w-1/2 " >
                    <Text>
                        By  {creator?.user_name}
                        <Divider className='bg-black' type="vertical" />
                        <Text>
                            On Monday 20th June
                        </Text>
                    </Text>
                </div>
            </div>
        <ChildrenContainer className="flex  overflow-y-scroll flex-col with-scrollbar items-center h-[83vh] w-full p-3  m-0 justify-start bg-white">
        <div  className="flex flex-row w-full pb-10 h-full !bg-white items-start jusitfy-start">
            <div className="flex flex-col items-center justify-start w-3/4 ">
                <div className="flex flex-row mt-2 w-full items-center justify-start">
                {!edit_description && <Button icon={<EditOutlined/>} onClick={()=>set_edit_description(true)}>
                        Edit Description
                    </Button>}
                </div>
                <Divider className="!mt-0 !pt-0" />
                <div className="flex flex-col with-scrollbar w-full items-center justify-start h-[400px] overflow-y-scroll ">
                <ReactQuill  theme="bubble" preserveWhitespace={true} readOnly={true} value={ typeof description == "undefined" ? "" : description }  />
                </div>
                <Divider className='!mb-2' />
                {edit_description && <div className="flex flex-row items-center justify-end w-full">
                    <Button icon={<SaveOutlined/>} className="mr-3 !flex !flex-row !items-center !justify-between" >
                        Save
                    </Button>
                    <Button className="mr-3 !flex !flex-row !items-center !justify-between" >
                        Cancel
                    </Button>
                </div>}
                <div className="flex flex-row w-full items-center justify-between mt-2 p-2 ">


                        <div className="flex flex-col items-start justify-start">
                            <Text className="font-medium text-lg !text-black mb-2 " >
                                Assignees
                            </Text>
                            <Avatar.Group>
                                {
                                    assignees?.map(({avatar, user_name})=>(
                                        <Tooltip title={user_name} >
                                            <div className="!flex !flex-row !items-center justify-center overflow-hidden rounded-full h-[40px] w-[40px] ">
                                                <Image src={typeof avatar !== "undefined" ? avatar : `https://joeschmoe.io/api/v1/${user_name}`} width={40} height={40} referrerPolicy="no-referrer" />
                                            </div>
                                        </Tooltip>
                                    ))
                                }
                                <Dropdown arrow overlay={<div className="p-5 bg-white shadow-xl " >
                                    {members[0]?.filter(({user_name}) => !assignees?.map((val)=>val.user_name).includes(user_name as any)).length > 0 ? <Checkbox.Group>
                                        {members[0].map(({user_name})=>(
                                            !assignees?.map(({user_name})=>user_name).includes(user_name as any) &&
                                            <Checkbox value={user_name} >
                                                {user_name}
                                            </Checkbox>
                                        ))}
                                    </Checkbox.Group> : <Empty/> }
                                </div>} >
                                    <Avatar className="!flex flex-row cursor-pointer items-center justify-center" size="large" icon={<UserAddOutlined/>} style={{backgroundColor: generateRandomColor()}} />
                                </Dropdown>
                            </Avatar.Group>
                            
                        </div>
                        
                        <div className="flex flex-col items-stat justify-start w-1/4 ">
                            <Text className="font-medium text-lg !text-black mb-2 " >
                                Tags
                            </Text>
                            <div className="flex flex-row w-full items-center justify-start flex-wrap ">
                                {
                                    tags?.map(({tag_name, tag_color})=>(
                                        <Tag  color={tag_color} >
                                            {tag_name}
                                        </Tag>
                                    ))
                                }
                            </div>
                            <div className="flex flex-row mt-2">
                                <MultipleSelectDropdown get_active={(vals)=>{
                                    console.log(vals)
                                }} tags={[
                                "New",
                                "Functionality",
                                "Improvement"
                                ]} />
                            </div>
                            
                        </div>

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
                        <div className="flex flex-col w-full h-full pt-5 pb-8">
                            <div className="flex flex-col mb-3 items-start justify-start w-full">
                                <Text className='!text-black mb-3 ' >
                                   Add a comment
                                </Text>
                                <div className="flex flex-row w-full mb-10">
                                <ReactQuill value={comment} defaultValue="" onChange={set_comment} theme="snow" preserveWhitespace={true} className='w-full' />
                                </div>
                                
                                <div className="flex flex-row w-full items-center justify-start mt-2">
                                    <Button onClick={submit_comment} icon={<SaveOutlined/>} className="flex mr-4 flex-row items-center justify-between" >
                                        Save
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start mt-4 w-full">
                                <Steps direction='vertical' current={comments?.length} status='finish' >
                                    {
                                        comments?.map(({author, description}, key)=>{
                                        return (
                                            <Steps.Step icon={
                                                <div className="flex flex-row items-center h-[40px] w-[40px] overflow-hidden  rounded-full " >
                                                    <Image src={typeof author.avatar !== "undefined" ? author.avatar : `https://joeschmoe.io/api/v1/${author?.name}` } width={40} height={40} />
                                                </div>
                                            } description={
                                                <div className={`flex flex-col items-center transition-all duration-300 justify-start relative ${ active_comment !== key ? "h-[150px]": "h-full"} overflow-hidden rounded-md border-[0.2px]  border-gray-100 !bg-[#F2F5FA]   w-full`}>
                                                    <ReactQuill className='w-full' defaultValue={""} theme="bubble" value={typeof description !== "undefined" ? description : ""} readOnly  />
                                                    {active_comment !== key && <div className="absolute bottom-3 right-[50%] flex flex-row items-center bg-gradient-to-b bg-transparent">
                                                            <Button onClick={()=>set_active_comment(key)} style={{backgroundColor: "blue", color: "white"}} >
                                                                Read More
                                                            </Button>
                                                    </div>}
                                                </div>
                                            } />
                                        )})
                                    }
                                </Steps>
                            </div>
                        </div>
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
            
        </div>
        
        </ChildrenContainer>  
        </div>
    </BaseModalContainer>
  )
}

export default LeftModalContainer

const ChildrenContainer = styled.div`
`