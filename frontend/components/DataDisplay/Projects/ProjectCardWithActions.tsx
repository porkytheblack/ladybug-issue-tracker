import { MoreOutlined, PushpinOutlined } from '@ant-design/icons'
import { Col, Divider, Dropdown, Menu, Row, Tooltip, Typography } from 'antd'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'
import { IssueInterface } from '../../../globaltypes'
import { is_def_string } from '../../../helpers'
import useProjects from '../../../hooks/useProjects'
import { activeProjectAtom, userAtom } from '../../../jotai/state'
import Platform from '../../OneJob/Platform'
import { project_type } from './ProjectCard'

const {Text} = Typography

function ProjectCardWithActions({project_name, platform, team, _id, issues}:{project_name?: string, platform?: string, _id?: string, team?: string, issues: IssueInterface[]}) {
  const [dropdown, set_dropdown] = useState<"visible" | "colapsed" >("colapsed")
  const [current_project, set_current_project] = useAtom(activeProjectAtom)
  const [user, ] = useAtom(userAtom)
  const {projects} = useProjects()
  const DropDownMenu = () =>(
    <Menu mode="vertical" className='!min-w-[200px]'   >
      <Menu.Item onClick={()=>{push("/dashboard/projects/sprints")}} key="sprints" >
          Sprints
      </Menu.Item>
      <Menu.Item onClick={()=>{push("/dashboard/projects/settings")}} key="settings" >
          Settings
      </Menu.Item>
      <Menu.Item  key="delete" >
          Delete Project
      </Menu.Item>
      <Menu.Item key="archive" >
          Archive Project
      </Menu.Item>
    </Menu>
  )

  const {pathname, push} = useRouter()

  return (
    <CardContainer  className="bg-[#fcfcfc] !w-full !h-full flex flex-col  mr-4 mb-4 items-center justify-between overflow-hidden  cursor-pointer rounded-[8px] border-[.0.7px] border-[#eaeaea] group " >
        { projects.filter((project)=>project._id == _id)[0]?.project_creator == user?.user_name && <div className="flex p-[10px] flex-row items-center mb-5 justify-end w-full pl-[10px]">
          <Tooltip title="Pin project" >
            <a  className=" invisible mr-[10px] group-hover:visible flex  hover:bg-[#eaeaea]  flex-row items-center justify-center rounded-full p-[5px] ">
                <PushpinOutlined color="primary" />
            </a>
          </Tooltip>
          <Dropdown trigger={["click"]}  overlay={DropDownMenu} >
            <a  className=" invisible mr-[10px] group-hover:visible flex  hover:bg-[#eaeaea]  flex-row items-center justify-center rounded-full p-[5px] ">
                <MoreOutlined/>
            </a>
          </Dropdown>
          
        </div>}
        { projects.filter((project)=>project._id == _id)[0]?.project_creator !== user?.user_name && <div className="flex p-[20px] h-6 flex-row items-center mb-5 justify-end w-full pl-[10px]"></div>}
        <div onClick={()=>{
          push("/dashboard/projects/overview")
          set_current_project(is_def_string(_id))
          }}  className="flex flex-row items-center justify-center w-full h-full">
          <Platform platform={platform} />
        </div>
        <div onClick={()=>{
          push("/dashboard/projects/overview")  
          set_current_project(is_def_string(_id))          
          }} className="flex p-[10px] flex-row items-center justify-center w-full">
          <Text className="font-medium flex flex-row items-center justify-center text-sm" >
            <Text className="!text-black mr-5 capitalize" >
              {project_name}
            </Text>
            <Text  >
              {team}
            </Text>
          </Text>
        </div>
        <Row className="w-full max-h-[40px] min-h-[40px] border-t-[1px] border-[#eaeaea]  border-solid " align="top" justify='space-between'   >
          <Col className="!h-[40px] !flex !flex-row items-center justify-center !border-r-[#eaeaea] !border-solid !border-r-[1px] " span={12} >
                <Text className="text-sm mr-2 font-medium " > 
                  <Text className="!text-black" >
                      {issues?.filter(({status})=>status !== "closed").length}
                  </Text>
                  / 
                  <Text>
                    {issues?.length}
                  </Text>
                 </Text>
                 <Text className='!text-black text-sm ' >
                    Open
                   </Text>
          </Col>
          <Col span={12} className="!h-[40px] !flex !flex-row items-center  justify-center "  >
                <Text className="text-sm mr-2 font-medium " > 
                  <Text className="!text-green-600" >
                  {issues?.filter(({status})=>status == "closed").length}
                  </Text>
                  / 
                  <Text className="text-green-900" >
                  {issues?.length}
                  </Text>
                 </Text>
                 <Text className='!text-black text-sm ' >
                    Closed
                   </Text>
          </Col>
        </Row>
    </CardContainer>
  )
}

export default ProjectCardWithActions

const CardContainer = styled.div`
        :hover{
            box-shadow:  0 4px 22px rgba(13,61,98,.19);
        }
        transition: box-shadow .2s ease-in;
        >a{
          text-decoration: none;
        }
`