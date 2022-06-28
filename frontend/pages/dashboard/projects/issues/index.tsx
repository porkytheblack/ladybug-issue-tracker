import { BugOutlined, BulbOutlined, DownOutlined, ExclamationCircleOutlined, FileOutlined, FilterOutlined, IssuesCloseOutlined, LoadingOutlined, PlusOutlined, QuestionOutlined, SearchOutlined, StarOutlined, ToolOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Checkbox, Dropdown, Form, Input, Menu, Modal, notification, Select } from 'antd'
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
import { backend_url } from '../../../../globals'
import { activeProjectAtom } from '../../../../jotai/state'
import useIssues from '../../../../hooks/useIssues'



const activeFilterAtomAtom = atom<"none"| "severity" | "type" | "assignee">("none")
const activeFilter = atom((get)=>get(activeFilterAtomAtom))



 function Issues() {
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
  const handleSubmit = () =>{
    issue_form.validateFields().then((vals)=>{
      console.log(vals)
      console.log(current_option)

      axios.post(`${backend_url}/issue/${current_project}`, {
        summary: vals.summary,
        description: vals.description,
        type: current_option[0],
        severity: current_option[1],
        status: current_option[2],
        assignees: members[0].filter(({user_name})=>vals.assignees.includes(user_name)),
        tags: active_tags.map((tag)=>({
          tag_name: tag,
          tag_color: generateRandomColor()
        })),
        attachments: []
      }, {
        withCredentials: true
      }).then(()=>{
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

  const {issues, total_issues, new_issues, closed_issues, ongoing_issues} = useIssues()


  return (
    <PageBaseContainer  >
        <Modal   title="Add Issue" width="60vw" onCancel={()=>{set_issue_modal_visible(false)}} visible={issue_modal_visible} footer={[
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
                          <Form.Item name={"assignees"} label="Assignees" >
                            
                                  <Checkbox.Group>
                                  {
                                   typeof members[0] !== "undefined" && members[0].map(({user_name, avatar})=>{
                                      return (
                                        <Checkbox className="!flex !flex-row items-center !w-full !h-full justify-between" value={user_name} >
                                      <div className="flex flex-row items-center w-[250px] justify-between">
                                        <div style={{backgroundColor: generateRandomColor()}} className="flex flex-row h-[40px] w-[40px] rounded-full overflow-hidden ">
                                          <Image src={typeof avatar !== "undefined" ? avatar : `https://joeschmoe.io/api/v1/${user_name}`} referrerPolicy="no-referrer" height="40px" width="40px" />
                                        </div>  
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
                              <BaseButtonDropdown  onClick={()=>set_active(0)} get_current_val={change_current_option} title="Issue Type" default_val={{name: "bug", current_icon: <BugOutlined/>}} options={[
                                {
                                  icon: <BugOutlined/>,
                                  name: "bug"
                                },
                                {
                                  icon: <SearchOutlined/>,
                                  name: "observations"
                                },
                                {
                                  icon: <QuestionOutlined/>,
                                  name: "question"
                                },
                                {
                                  icon: <BulbOutlined/>,
                                  name: "suggestion"
                                },
                                {
                                  icon: <ToolOutlined/>,
                                  name: "improvements"
                                },
                                {
                                  icon: <StarOutlined/>,
                                  name: "New Features"
                                }
                              ]} />
                              <BaseButtonDropdown onClick={()=>set_active(1)} get_current_val={change_current_option} title="Severity" default_val={{name: "low", current_icon: <></>}} options={[
                                {
                                  icon: <></>,
                                  name: "Low"
                                },
                                {
                                  icon: <></>,
                                  name: "Medium"
                                },
                                {
                                  icon: <></>,
                                  name: "High"
                                },
                                {
                                  icon: <></>,
                                  name: "Critical"
                                }
                              ]} />
                              <BaseButtonDropdown onClick={()=>set_active(2)} get_current_val={change_current_option} title="Status" default_val={{name: "New", current_icon: <></>}} options={[
                                    {
                                      icon: <></>,
                                      name: "New"
                                    },
                                    {
                                      icon: <></>,
                                      name: "Improvement"
                                    },
                                    {
                                      icon: <></>,
                                      name: "Bug"
                                    },
                                    {
                                      icon: <></>,
                                      name: "Issue"
                                    },
                                    {
                                      icon: <></>,
                                      name: "Task"
                                    },
                                    {
                                      icon: <></>,
                                      name: "Question"
                                    },
                                    {
                                      icon: <></>,
                                      name: "Suggestion"
                                    },
                                    {
                                      icon: <></>,
                                      name: "Functional"
                                    },
                                    {
                                      icon: <></>,
                                      name: "UI"
                                    }
                              ]} />
                            <MultipleSelectDropdown get_active={update_active_tags} tags={[
                              "New",
                              "Functionality",
                              "Improvement"
                            ]} />
                    </div>  
              </div>
        </Modal>

        <div className="flex flex-row items-center p-[10px] justify-between w-full">
        <Avatar.Group>
              <Avatar size="large" src="https://joeschmoe.io/api/v1/random" />
              <Avatar size="large" src="https://joeschmoe.io/api/v1/joe" />
              <Avatar size="large" src="https://joeschmoe.io/api/v1/jess" />
              <Avatar size="large" icon={<UserAddOutlined/>} className="bg-blue-800 cursor-pointer !flex flex-row items-center justify-center "  />
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
            <Input.Search className="w-1/4" placeholder='Search issues'  />
            <Dropdown onVisibleChange={(flag: boolean)=>{
              handleMenuVisibleChange(flag)
            }} overlay={FilterMenu} visible={isMenuVisible} >
              <Button className=' !text-black !flex !flex-row !items-center !justify-center '   icon={<FilterOutlined/>}  >
                Filter
              </Button>
            </Dropdown> 
        </div>
        <div className="flex flex-col space-y-2 items-center justify-start w-full h-full">
          {
            issues.map((issue, key)=>(
              <BugCard issue={issue} count={key} />
            ))
          }
        </div>
    </PageBaseContainer>
  )
}

export default Issues