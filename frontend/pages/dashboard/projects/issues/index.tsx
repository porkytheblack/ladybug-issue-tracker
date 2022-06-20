import { BugOutlined, ExclamationCircleOutlined, FileOutlined, FilterOutlined, IssuesCloseOutlined, LoadingOutlined, PlusOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Checkbox, Dropdown, Input, Menu, Select } from 'antd'
import { atom, useAtom, useAtomValue } from 'jotai'
import React, { useState } from 'react'
import PageBaseContainer from '../../../../components/Containers/PageBaseContainer'
import BugCard from '../../../../components/DataDisplay/Bugs/BugCard'
import BaseIssueCard from '../../../../components/DataDisplay/Issues/BaseIssueCard'


const activeFilterAtomAtom = atom<"none"| "severity" | "type" | "assignee">("none")
const activeFilter = atom((get)=>get(activeFilterAtomAtom))



function Issues() {
  const current_filter = useAtomValue(activeFilter)
  const [activeFilterAtom, set_activeFilterAtom] = useAtom(activeFilterAtomAtom)
  const [isMenuVisible, handleMenuVisibleChange] = useState<boolean>(false)

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
        <div className="flex flex-row items-center p-[10px] justify-between w-full">
        <Avatar.Group>
              <Avatar size="large" src="https://joeschmoe.io/api/v1/random" />
              <Avatar size="large" src="https://joeschmoe.io/api/v1/joe" />
              <Avatar size="large" src="https://joeschmoe.io/api/v1/jess" />
              <Avatar size="large" icon={<UserAddOutlined/>} className="bg-blue-800 cursor-pointer !flex flex-row items-center justify-center "  />
            </Avatar.Group>
            <Button size='large'  icon={<PlusOutlined/>} className="mr-5 !bg-blue-800 !text-white " >
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