import { BugOutlined, BulbOutlined, ExclamationCircleOutlined, FileOutlined, FilterOutlined, IssuesCloseOutlined, LoadingOutlined, PlusOutlined, QuestionOutlined, SearchOutlined, StarOutlined, ToolOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Checkbox, Dropdown, Form, Input, Menu, Modal, Select } from 'antd'
import { atom, useAtom, useAtomValue } from 'jotai'
import React, { useEffect, useState } from 'react'
import ReactQuill, {Quill} from 'react-quill'
import PageBaseContainer from '../../../../components/Containers/PageBaseContainer'
import BugCard from '../../../../components/DataDisplay/Bugs/BugCard'
import BaseIssueCard from '../../../../components/DataDisplay/Issues/BaseIssueCard'
import "react-quill/dist/quill.snow.css"
import UploadAction from '../../../../components/Actions/UploadAction'
import BaseButtonDropdown from '../../../../components/Dropdowns/BaseButtonDropdown'



const activeFilterAtomAtom = atom<"none"| "severity" | "type" | "assignee">("none")
const activeFilter = atom((get)=>get(activeFilterAtomAtom))



 function Issues() {
  const current_filter = useAtomValue(activeFilter)
  const [activeFilterAtom, set_activeFilterAtom] = useAtom(activeFilterAtomAtom)
  const [isMenuVisible, handleMenuVisibleChange] = useState<boolean>(false)
  const [issue_modal_visible, set_issue_modal_visible] = useState<boolean>(false)
  const [on_client, set_on_client] = useState<boolean>(false)
  const [{
    summary,
    description,
    asignees,
    attachments,
    system_details
  }, set_issue] = useState<{
    summary: string,
    description: string,
    asignees: string[],
    attachments: string[],
    system_details: string
  }>({
    summary: "",
    description: "",
    asignees: [],
    attachments: [],
    system_details: ""
  })

  const [current_option, set_current_option] = useState<string[]>([
    "bug",
    "medium",
    "new"
  ])
  const [active, set_active] = useState<number>(0)

  const change_current_option = (val: string) =>{
    if(active == 0){
      const c = current_option
      c[0] = val
      set_current_option((_)=>c)
    }

  }

  useEffect(()=>{
    set_on_client(true)
    return ()=>{
      set_on_client(false)
    }
  }, [])
  



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


  return (
    <PageBaseContainer  >

        <Modal title="Add Issue" width="60vw" onCancel={()=>{set_issue_modal_visible(false)}} visible={issue_modal_visible} footer={null} >
              <div className="flex flex-row items-start justify-between w-full">
                    <div className="flex flex-col items-start justify-start w-[60%] ">
                        <Form name="issue_form" layout='vertical' className='w-full h-full' >

                          <Form.Item  label="Summary"  >
                            <Input onChange={(e)=>{
                                set_issue((issue)=>({
                                  ...issue,
                                  summary: e.target.value
                                }))
                            }} value={summary} placeholder='Crisp, precise, and focus on impact' />
                          </Form.Item>
                          {on_client && <Form.Item label="Description" >
                              <ReactQuill theme='snow' value={description} onChange={(content)=>{
                                  set_issue((issue)=>({
                                    ...issue,
                                    description: content
                                  }))
                              }} />
                          </Form.Item>}
                          <Form.Item label="System Details" >
                              <Input placeholder='e.g HP / Windows 11 / 64 bit' value={system_details} onChange={(e)=>{
                                set_issue((issue)=>({
                                  ...issue,
                                  system_details: e.target.value
                                }))
                              }} />
                          </Form.Item>
                          <Form.Item label="Assignees" >
                            <Avatar.Group>
                              <Avatar src="https://joeschmoe.io/api/v1/random" />
                              <Avatar src="https://joeschmoe.io/api/v1/jess"  />
                              <Avatar src="https://joeschmoe.io/api/v1/joe" />
                              <Avatar icon={<UserAddOutlined/>}  className="!flex cursor-pointer flex-row items-center justify-center" />
                            </Avatar.Group>
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

                              <BaseButtonDropdown onChange={(val)=>{

                              }} onClick={()=>set_active(1)} get_current_val={change_current_option} title="Severity" default_val={{name: "low", current_icon: <></>}} options={[
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

                          <BaseButtonDropdown onChange={(val)=>{

                          }} onClick={()=>set_active(2)} get_current_val={change_current_option} title="Status" default_val={{name: "New", current_icon: <></>}} options={[
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
            <BaseIssueCard icon={<BugOutlined className='text-blue-800' />} num={4} title={"Total issues"} />
            <BaseIssueCard icon={<FileOutlined className='text-blue-800' />} num={2} title={"New issues"} />
            <BaseIssueCard icon={<LoadingOutlined className='text-blue-800  ' />} num={1} title={"Ongoing"} />
            <BaseIssueCard icon={<IssuesCloseOutlined className='text-blue-800' />} num={0} title={"Closed"} />
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
          <BugCard/>
          <BugCard/>
          <BugCard/>
          <BugCard/>
          <BugCard/>
        </div>
    </PageBaseContainer>
  )
}

export default Issues