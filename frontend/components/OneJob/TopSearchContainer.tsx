import { Button, Col, Form, Input, Modal, notification, Row, Select } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import CustomSearch from '../Custom/CustomSearchBox'
import {useSearchBox} from "react-instantsearch-hooks" 
import { SearchBox } from 'react-instantsearch-dom'
import { PlusOutlined } from '@ant-design/icons'
import { atom, useAtom } from 'jotai'
import LeftModalContainer from '../Containers/LeftModal'
import { useForm } from 'antd/lib/form/Form'
import useTeams from '../../hooks/useTeams'
import { backend_url } from '../../globals'
import axios from 'axios'
import { tick_up_project } from '../../jotai/state'
import { is_def_string } from '../../helpers'
import { isUndefined } from 'lodash'

const {Option} = Select

export const topSearchContainerAtom = atom({
    create_project_modal_open: false,
    chosen_team: "all",
    platform: "all"
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



function TopSearchContainer({change_filter}: {change_filter: (val: string)=>void}) {
    const [, set_platform] = useAtom(change_platform)
    const [, set_team] = useAtom(change_team)
    const [, handleModalVisibility] = useAtom(handleModalVisibilityAtom)
    const [{create_project_modal_open, chosen_team, platform}, ] = useAtom(topSearchContainerAtom)
    const [submission_error, set_submission_error] = useState<boolean>(false)
    const [project_form] = useForm()
    const {team_names, teams_plus_ids} = useTeams()
    const [, up] = useAtom(tick_up_project)
    const [active_team_id, set_active_team_id] = useState<string>("")

    const handleSubmit = () =>{
        console.log(active_team_id)
        project_form.validateFields().then((vals)=>{
            axios.post(`${backend_url}/project`, {
                ...vals,
                team: teams_plus_ids.filter(({team_name, _id})=>_id == vals.team)[0]?.team_name,
                team_id: vals.team
            }, {
                withCredentials: true
            }).then(({})=>{
                up()
                notification.success({
                    message: "Successfully added new project",
                    key: "add_project_success"
                })
                handleModalVisibility(false)
            }).catch((e)=>{
                console.log(e)
                notification.error({
                    message: "An error occured",
                    key: "add_project_error"
                })
            })
        }).catch((e)=>{
            console.log(e)
        })
    }

    

  return (
        <CustomContainer align="middle" justify='space-between' className="w-full " >
            <Col span={4} >
                    <Input.Search onChange={(e)=>{
                        change_filter(e.target.value)
                    }} placeholder='Search...' />
            </Col>
            <Col span={3}  >
                <Select onChange={(val)=>{
                    set_team(val as any)
                }} className="w-full" value={chosen_team} defaultValue={"all"}  >
                    <Option value="all" >
                        All
                    </Option>
                    {
                        team_names.map((team_name)=>(
                            <Option key={team_name}  value={team_name} >
                                {team_name}
                            </Option>
                        ))
                    }
                    
            </Select>
            </Col>
            <Col span={3}  >
                <Select onChange={(val)=>{
                    set_platform(val as any)
                }} className="w-full" value={platform} defaultValue={"all"}  >
                    <Option value="all" >
                        All Platforms
                    </Option>
                    <Option  value="android" >
                        Android
                    </Option>
                    <Option  value="ios" >
                        IOS
                    </Option>
                    <Option  value="web" >
                        Web
                    </Option>
                    <Option  value="desktop" >
                        Desktop
                    </Option>
                </Select>
            </Col>
            <Col span={9} ></Col>
            <Col span={3} >
                <Button icon={<PlusOutlined/>} onClick={()=>{
                        handleModalVisibility(true)
                }} color="black" className="flex flex-row items-center" >
                    Create Project
                </Button>
            </Col>
            <Modal visible={create_project_modal_open} onCancel={()=>{handleModalVisibility(false)}} title="New Project" footer={null}  >
                <div className="flex flex-col w-full h-full items-center justify-start">
                    <Form initialValues={[
                        {
                            platform: "android"
                        }
                    ]} onChange={()=>{
                        set_submission_error(false)
                    }} onError={(e)=>{
                                console.log(e)
                                set_submission_error(true)
                    }} onFinish={handleSubmit} form={project_form} layout='vertical' className='!flex !flex-row !flex-wrap w-full !items-center !justify-between' name="new_project_form" >
                        <Form.Item className='!w-1/2' label="Project Name" rules={[
                            {
                                required: true,
                                message: "Project Name is required"
                            }
                        ]} name="project_name" >
                            <Input placeholder='New project name'  />
                        </Form.Item>
                        <Form.Item   className="!w-1/2" label="Team" rules={[
                            {
                                required: true,
                                message: "Select a team to continue"
                            }
                        ]} name="team" >
                            <Select onChange={(val)=>{
                                console.log(val)
                            }} >
                                {
                                    teams_plus_ids.map(({team_name, _id}, key)=>(
                                        <Select.Option key={_id} >
                                            {team_name}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item initialValue={"android"} className="!w-1/2" label="Platform" rules={[
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
                                <Select.Option key="ios" >
                                    IOS
                                </Select.Option>
                                <Select.Option key="desktop" >
                                    Desktop
                                </Select.Option>
                                <Select.Option key="wearable" >
                                    Wearable
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item className="!w-full"   >
                            <Button  htmlType='submit' className="!text-black" >
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