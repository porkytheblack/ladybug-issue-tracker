import { Button, Col, Form, Input, Modal, Row, Select } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import CustomSearch from '../Custom/CustomSearchBox'
import {useSearchBox} from "react-instantsearch-hooks" 
import { SearchBox } from 'react-instantsearch-dom'
import { PlusOutlined } from '@ant-design/icons'
import { atom, useAtom } from 'jotai'
import LeftModalContainer from '../Containers/LeftModal'

const {Option} = Select

export const topSearchContainerAtom = atom({
    create_project_modal_open: false,
    chosen_team: "d_house_dev",
    platform: "ios"
})

export const handleModalVisibilityAtom = atom(
    null,
    (get, set, change: boolean)=>{
        const initial_atom = get(topSearchContainerAtom)
        console.log("I got")
        if(initial_atom){
            set(topSearchContainerAtom, (prev)=>({
                ...prev,
                create_project_modal_open: change
            }))
        }   
    
    }
)

export const change_team = atom (
    null,
    (get, set, change: string )=>{
        const team = get(topSearchContainerAtom)
        if(team){
            set(topSearchContainerAtom, (prev: any)=>({
                ...prev,
                chosen_team: change
            }))
        }
    }
)

export const change_platform = atom (
    null,
    (get, set, change: string)=>{
        const prev_data = get(topSearchContainerAtom)
        if(prev_data){
            set(topSearchContainerAtom, (prev: any)=>({
                ...prev,
                platform: change
            }))
        }
    }
)



function TopSearchContainer() {
    const [, set_platform] = useAtom(change_platform)
    const [, set_team] = useAtom(change_team)
    const [, handleModalVisibility] = useAtom(handleModalVisibilityAtom)
    const [{create_project_modal_open, chosen_team, platform}, ] = useAtom(topSearchContainerAtom)
    const [submission_error, set_submission_error] = useState<boolean>(false)

    const handleSubmit = (val: any) =>{
        console.log(val)
        if(!submission_error){
            handleModalVisibility(false)
        }
        
    }

  return (
        <CustomContainer align="middle" justify='space-between' className="w-full " >
            <Col span={4} >
                    <SearchBox/>
            </Col>
            <Col span={3}  >
                <Select className="w-full" value={chosen_team} defaultValue={"all_teams"}  >
                    <Option value="all_teams" >
                        All Teams
                    </Option>
                    <Option  value="d_house_dev" >
                        d_house_dev
                    </Option>
                </Select>
            </Col>
            <Col span={3}  >
                <Select className="w-full" value={platform} defaultValue={"all_platforms"}  >
                    <Option value="all_platforms" >
                        All Platforms
                    </Option>
                    <Option  value="Android" >
                        Android
                    </Option>
                    <Option  value="ios" >
                        IOS
                    </Option>
                    <Option  value="mobile_web" >
                        Mobile Web
                    </Option>
                </Select>
            </Col>
            <Col span={3}  >
                <Select className="w-full" defaultValue={"all"}  >
                    <Option value="all" >
                        All
                    </Option>
                    <Option  value="Active" >
                        Active
                    </Option>
                    <Option  value="Archived" >
                        Archived
                    </Option>
                </Select>
            </Col>
            <Col span={7} ></Col>
            <Col span={3} >
                <Button icon={<PlusOutlined/>} onClick={()=>{
                        handleModalVisibility(true)
                }} color="black" className="flex flex-row items-center" >
                    Create Project
                </Button>
            </Col>
            <Modal visible={create_project_modal_open} onCancel={()=>{handleModalVisibility(false)}} title="New Project" footer={null}  >
                <div className="flex flex-col w-full h-full items-center justify-start">
                    <Form onChange={()=>{
                        set_submission_error(false)
                    }} onError={(e)=>{
                                console.log(e)
                                set_submission_error(true)
                    }} onFinish={handleSubmit} layout='vertical' className='!flex !flex-row !flex-wrap w-full !items-center !justify-between' name="new_project_form" >
                        <Form.Item className='!w-1/2' label="Project Name" rules={[
                            {
                                required: true,
                                message: "Project Name is required"
                            }
                        ]} name="project_name" >
                            <Input placeholder='New project name'  />
                        </Form.Item>
                        <Form.Item className="!w-1/2" label="Team" rules={[
                            {
                                required: true,
                                message: "Select a team to continue"
                            }
                        ]} name="project_team" >
                            <Select defaultValue={["d_house_dev"]} >
                                <Select.Option key="d_house_dev" >
                                    d_house_dev
                                </Select.Option>
                                <Select.Option key="ProjectX" >
                                    ProjectX
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item className="!w-1/2" label="Platform" rules={[
                            {
                                required: true,
                                message: "Select a platform to continue"
                            }
                        ]} name="platform" >
                            <Select defaultValue={["android"]} >
                                <Select.Option key="android" >
                                    Android
                                </Select.Option>
                                <Select.Option key="web" >
                                    Web
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item className="!w-full"   >
                            <Button htmlType='submit' className="!text-black" >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </CustomContainer>
  )
}

export default TopSearchContainer

const CustomContainer = styled(Row)``