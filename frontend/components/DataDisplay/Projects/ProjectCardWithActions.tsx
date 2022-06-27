import { MoreOutlined, PushpinOutlined } from '@ant-design/icons'
import { Col, Divider, Dropdown, Menu, Row, Tooltip, Typography } from 'antd'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'
import { is_def_string } from '../../../helpers'
import { activeProjectAtom } from '../../../jotai/state'
import { project_type } from './ProjectCard'

const {Text} = Typography

function ProjectCardWithActions({project_name, platform, team, _id}:{project_name?: string, platform?: string, _id?: string, team?: string}) {
  const [dropdown, set_dropdown] = useState<"visible" | "colapsed" >("colapsed")
  const [current_project, set_current_project] = useAtom(activeProjectAtom)
  
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
    <CardContainer  className="bg-[#fcfcfc] !w-full !h-full flex flex-col  items-center justify-start overflow-hidden  cursor-pointer rounded-[8px] border-[.0.7px] border-[#eaeaea] group " >
        <div className="flex p-[10px] flex-row items-center mb-5 justify-end w-full pl-[10px]">
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
          
        </div>
        <div onClick={()=>{
          push("/dashboard/projects/overview")
          set_current_project(is_def_string(_id))
          }}  className="flex flex-row items-center justify-center w-full">
          <Image src={`/icons/${platform}.svg`}  height={100} width={110}  />
        </div>
        <div onClick={()=>{
          push("/dashboard/projects/overview")  
          set_current_project(is_def_string(_id))          
          }} className="flex p-[10px] flex-row items-center justify-center w-full">
          <Text className="font-medium flex flex-row items-center justify-center text-lg" >
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
                      0
                  </Text>
                  / 
                  <Text>
                    0
                  </Text>
                 </Text>
                 <Text className='!text-black text-sm ' >
                    Open
                   </Text>
          </Col>
          <Col span={12} className="!h-[40px] !flex !flex-row items-center  justify-center "  >
                <Text className="text-sm mr-2 font-medium " > 
                  <Text className="!text-green-600" >
                      0
                  </Text>
                  / 
                  <Text className="text-green-900" >
                    0
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