import { BugOutlined, BulbOutlined, DownOutlined, ExclamationCircleOutlined, FileOutlined, FilterOutlined, IssuesCloseOutlined, LoadingOutlined, PlusOutlined, QuestionOutlined, SearchOutlined, StarOutlined, ToolOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Checkbox, Drawer, Dropdown, Empty, Form, Input, Menu, Modal, notification, Select, Tooltip } from 'antd'
import { atom, useAtom, useAtomValue } from 'jotai'
import React, { useEffect, useState } from 'react'
const ReactQuill = dynamic(()=>import("react-quill"), {
  ssr: false
})
import PageBaseContainer from '../../../../components/Containers/PageBaseContainer'
import BugCard from '../../../../components/DataDisplay/Bugs/BugCard'
import BaseIssueCard from '../../../../components/DataDisplay/Issues/BaseIssueCard'
import "react-quill/dist/quill.snow.css"
import UploadAction from '../../../../components/Actions/UploadAction'
import BaseButtonDropdown from '../../../../components/Dropdowns/BaseButtonDropdown'
import MultipleSelectDropdown from '../../../../components/Dropdowns/MultipleSelectDropdown'
import dynamic from 'next/dynamic'
import { useForm } from 'antd/lib/form/Form'
import useTeam from '../../../../hooks/useTeam'
import Image from 'next/image'
import { is_def_string } from '../../../../helpers'
import { Text } from '../../../_app'
import { generateRandomColor } from '../../../../helpers/randomColor'
import axios from 'axios'
import { backend_url, general_statuses, global_tags, IssueTypes, severity_levels } from '../../../../globals'
import { activeProjectAtom, tick_up } from '../../../../jotai/state'
import useIssues from '../../../../hooks/useIssues'
import EmptyAndLoading from '../../../../components/Containers/EmptyAndLoading'
import { flatten, isUndefined } from 'lodash'
import { IssueInterface } from '../../../../globaltypes'
import GeneralAvatar from '../../../../components/OneJob/GeneralAvatar'



const activeFilterAtomAtom = atom<"none"| "severity" | "type" | "assignee">("none")
const activeFilter = atom((get)=>get(activeFilterAtomAtom))



 function Issues() {
  const [, up] = useAtom(tick_up)
  const [current_project, set_current_project ] = useAtom(activeProjectAtom)
  const current_filter = useAtomValue(activeFilter)
  const [activeFilterAtom, set_activeFilterAtom] = useAtom(activeFilterAtomAtom)
  const [isMenuVisible, handleMenuVisibleChange] = useState<boolean>(false)
  const [issue_modal_visible, set_issue_modal_visible] = useState<boolean>(false)
  const [on_client, set_on_client] = useState<boolean>(false)
  const [active_tags, set_active_tags] = useState<string[]>([])
  const [description, set_description] = useState<string>("")
  const [team_overlay, set_team_overlay] = useState<boolean>(false)
  const [current_option, set_current_option] = useState<string[]>([
    "bug",
    "medium",
    "new"
  ])
  const [active, set_active] = useState<number>(0)
  const [attachments, set_attachments] = useState<string[]>([])
  const change_current_option = (val: string) =>{
    
      const c = current_option
      c[active] = val
      set_current_option((_)=>c)

  }
  useEffect(()=>{
    set_on_client(true)
    return ()=>{
      set_on_client(false)
    }
  }, [])
  const update_active_tags = (vals: string[])=>{
    set_active_tags(vals)
  }
  const FilterMenu = () =>{
    const filters = current_filter == "none" ? [] : current_filter == "assignee" ? ["Dave", "Jim", "Don"] : current_filter == "severity" ? ["High", "Critical", "Low", "Medium"] : ["Observation", "Bug", "Question", "Suggestion", "New Feature", "Improvement" , "Note"]

    return (
      <div  className="flex shadow-lg  bg-white w-[300px]  flex-row items-start justify-start">
          <Menu activeKey={current_filter} className="m-w-[100px] h-full min-h-[200px]" >
            <Menu.Item onClick={()=>{
              set_activeFilterAtom("type")
              }} icon={<BugOutlined/>} key="type" >
                Type
            </Menu.Item>
            <Menu.Item onClick={()=>{set_activeFilterAtom("severity")}} icon={<ExclamationCircleOutlined/>} key="severity" >
              Issue
            </Menu.Item>
            <Menu.Item onClick={()=>{set_activeFilterAtom("assignee")}} icon={<UserOutlined/>} key="assignee" >
              Member
            </Menu.Item>
          </Menu>
          <div className="flex flex-col items-start justify-start h-full">
            <Checkbox.Group>
              
              <div className="flex flex-col p-[5px 20px 5px 20px] items-start justify-start h-full">
                <Checkbox value="" className='invisible' ></Checkbox>
                {
                  filters.map((item, val)=>(
                    <Checkbox key={val} value={item} >{item}</Checkbox>
                  ))
                }
                </div>
            </Checkbox.Group>
          </div>
      </div>    
    )
  }
  const [issue_form]  = useForm()
  const [search, set_search] = useState("")
  const [status_filter, set_status_filter] = useState("all")
  const [severity_filter, set_severity_filter] = useState("all")
  const [type_filter, set_type_filter] = useState("all")

  const handleSubmit = () =>{
    issue_form.validateFields().then((vals)=>{
      console.log(vals)
      console.log(current_option)

      axios.post(`${backend_url}/issue/${current_project}`, {
        summary: vals.summary,
        description: vals.description,
        system_details: vals.system_details,
        platform: vals.platform,

        type: current_option[0],
        severity: current_option[1],
        status: current_option[2],
        assignees: members.filter(({user_name})=>vals.assignees.includes(user_name)),
        tags: active_tags.map((tag)=>({
          tag_name: tag,
          tag_color: generateRandomColor()
        })),
        attachments: vals.attachments
      }, {
        withCredentials: true
      }).then(()=>{
        up()
        notification.success({
          message: "Added new issue successfully",
          key: "new_issue_success"
        })
        set_issue_modal_visible(false)

      }).catch((e)=>{
        console.log(e)
        notification.error({
          message: "An error occured",
          key: "add_issue_error"
        })
      })
    }).catch((e)=>{
      console.log(e)
    })
  }
  const {members} = useTeam()

  const {issues, total_issues, new_issues, closed_issues, ongoing_issues, is_error, is_loading} = useIssues()


  return (
    <PageBaseContainer  >
        <Drawer  destroyOnClose   title="Add Issue" width="60vw" onClose={()=>{set_issue_modal_visible(false)}} visible={issue_modal_visible} footer={[
          <Button onClick={handleSubmit} >
            Save
          </Button>,
          <Button onClick={()=>set_issue_modal_visible(false)} >
            Cancel
          </Button>
        ]} >
              <div className="flex flex-row items-start justify-between w-full">
                    <div className="flex flex-col items-start justify-start w-[60%] ">
                        <Form form={issue_form} name="issue_form" layout='vertical' className='w-full h-full' >

                          <Form.Item name="summary" rules={[{required: true, message: "A Summary is required"}]} label="Summary"  >
                            <Input  placeholder='Crisp, precise, and focus on impact' />
                          </Form.Item>
                          <Form.Item initialValue={""} name="description" label="Description" >
                              {on_client && <ReactQuill preserveWhitespace={true} theme="snow" value={description || ""} onChange={(content)=>{
                                set_description(content)
                              }} />}
                          </Form.Item>
                          <Form.Item name="system_details" label="System Details" >
                              <Input placeholder='e.g HP / Windows 11 / 64 bit'  />
                          </Form.Item>
                          <Form.Item name="platform" label="Platform" >
                              <Select defaultActiveFirstOption={true} >
                                <Select.Option value="web" >
                                  Web
                                </Select.Option>
                                <Select.Option value="desktop" >
                                  Desktop
                                </Select.Option>
                                <Select.Option value="android" >
                                  Android
                                </Select.Option>
                                <Select.Option value="ios" >
                                  IOS
                                </Select.Option>
                              </Select>
                          </Form.Item>
                          <Form.Item name={"assignees"} label="Assignees" >
                            
                                  <Checkbox.Group>
                                    <Checkbox className='invisible' />
                                  {
                                   typeof members !== "undefined" && members.map(({user_name, avatar})=>{
                                      return (
                                        <Checkbox className="!flex !flex-row items-center !w-full !h-full justify-between" value={user_name} >
                                      <div className="flex flex-row items-center w-[250px] justify-between">
                                        <GeneralAvatar avatar={avatar} user_name={user_name} />
                                        <Text className=' !text-black' >
                                          @{user_name}
                                        </Text>
                                      </div>
                                      </Checkbox>
                                    )})
                                  }
                                  </Checkbox.Group>
                             
                          </Form.Item>
                          <Form.Item name="attachments" label="Attachments" >
                            <UploadAction/>
                          </Form.Item>
                        </Form>
                        
                    </div>
                    <div className="flex pt-7 flex-col space-y-2 items-start justify-start w-1/4 ">
                              <BaseButtonDropdown  onClick={()=>set_active(0)} get_current_val={change_current_option} title="Issue Type" default_val={{name: "bug", current_icon: <BugOutlined/>}} options={IssueTypes} />
                              <BaseButtonDropdown onClick={()=>set_active(1)} get_current_val={change_current_option} title="Severity" default_val={{name: "low", current_icon: <></>}} options={severity_levels} />
                              <BaseButtonDropdown onClick={()=>set_active(2)} get_current_val={change_current_option} title="Status" default_val={{name: "New", current_icon: <></>}} options={general_statuses} />
                            <MultipleSelectDropdown get_active={update_active_tags} tags={global_tags} />
                    </div>  
              </div>
        </Drawer>

        <div className="flex flex-row items-center p-[10px] justify-between w-full">
            <Avatar.Group>
              {
                flatten(members).map(({user_name, avatar})=>(
                  <GeneralAvatar user_name={user_name} avatar={avatar} />
                ))
              }
            
            </Avatar.Group>
            <Button size='large' onClick={()=>{set_issue_modal_visible(true)}}  icon={<PlusOutlined/>} className="mr-5 !bg-blue-800 !text-white " >
                Add Issue
            </Button>
            
          </div>
          
          <div className="flex flex-row items-center mb-2 justify-between w-full pt-9">
            <BaseIssueCard icon={<BugOutlined className='text-blue-800' />} num={total_issues} title={"Total issues"} />
            <BaseIssueCard icon={<FileOutlined className='text-blue-800' />} num={new_issues} title={"New issues"} />
            <BaseIssueCard icon={<LoadingOutlined className='text-blue-800  ' />} num={ongoing_issues} title={"Ongoing"} />
            <BaseIssueCard icon={<IssuesCloseOutlined className='text-blue-800' />} num={closed_issues} title={"Closed"} />
          </div>
        <div className="flex flex-row p-2 items-center justify-start bg-transparent  w-full ">
            <Input.Search className="w-1/4"  value={search} onChange={(e)=>set_search(e.target.value)} placeholder='Search issues'  />
            
            <Select onChange={(val)=>{
              set_status_filter(val)
            }} defaultValue={"all"} className="min-w-[100px]"  >
              <Select.Option value="all" >
                All Statuses
              </Select.Option>
              {
                general_statuses.map((option)=>(
                  <Select.Option key={option.name.toLocaleLowerCase()} value={is_def_string(option.name).toLocaleLowerCase()} >
                    {option.name}
                  </Select.Option>
                ))
              }
            </Select>
            <Select onChange={(val)=>{
              set_severity_filter(val)
            }} defaultValue={"all"} className="min-w-[100px]"  >
              <Select.Option value="all" >
                All Severity Levels
              </Select.Option>
              {
                severity_levels.map((option)=>(
                  <Select.Option key={option.name.toLocaleLowerCase()} value={is_def_string(option.name).toLocaleLowerCase()} >
                    {option.name}
                  </Select.Option>
                ))
              }
            </Select>
            <Select onChange={(val)=>{
                set_type_filter(val)
            }} defaultValue={"all"} className="min-w-[100px]"  >
              <Select.Option value="all" >
                All Issue Types
              </Select.Option>
              {
                IssueTypes.map((option)=>(
                  <Select.Option key={option.name.toLocaleLowerCase()} value={is_def_string(option.name).toLocaleLowerCase()} >
                    {option.name}
                  </Select.Option>
                ))
              }
            </Select>
        </div>
        <EmptyAndLoading showLoading={true} loading={is_loading} className="flex flex-col space-y-2 items-center justify-start w-full h-full">
          { 
            issues.filter(({summary})=>{
                if(search.trim().length == 0) return true 
                
                return summary.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())
            }).filter(({type})=>{
              console.log("sum", type)
              if(type_filter == "all") return true 
              return type == type_filter
            }).filter(({severity})=>{
              if(severity_filter == "all") return true 
              return severity == severity_filter
            }).filter(({status})=>{
              if(status_filter == "all") return true 
              return status == status_filter
            }).map((issue: IssueInterface, key)=>(
              <BugCard issue={issue} count={key} />  
            ))
          }
        </EmptyAndLoading >
    </PageBaseContainer>
  )
}

export default Issues