import { Col, Row, Tabs, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BaseModalContainer from '../../../components/Containers/BaseModalContainer'
import Hero from '../../../components/Containers/Hero'
import LeftModalContainer from '../../../components/Containers/LeftModal'
import ProjectCardWithActions from '../../../components/DataDisplay/Projects/ProjectCardWithActions'
import TopSearchContainer from '../../../components/OneJob/TopSearchContainer'
import useProjects from '../../../hooks/useProjects'
import useTeams from '../../../hooks/useTeams'

const {TabPane} = Tabs
const {Text} = Typography

function Projects() {
  const [isModalVisible, handleModalVisibility] = useState<boolean>(true)
  const hide = () =>{
    handleModalVisibility(false)
  }


  ///////////////////get projects 
  const {projects, loading, error, len} = useProjects()
  
  ///////////////////end of get projects

  





  return (
    <ProjectContainer className="flex flex-col w-full h-full child-container items-center justify-start">
      
      <div className="w-full flex flex-col items-center h-[300px] justify-center bg-white" >
        <Hero image={["projects", "complete_project", "project_org" ] }more="with our easy to use tool" >
            Make working on your projects easier
          </Hero>
      </div>
      <div className="flex flex-row pb-4 items-center justify-center w-full bg-white">
          <div className="flex flex-row items-center h-full bg-white justify-start w-4/5">
            <TopSearchContainer/>
          </div>
      </div>
     
      <Tabs className="w-4/5 h-full " >

            <TabPane tab={
              <Text className='!text-black' >
                  All(3)
              </Text>
            }
            key="1"
            >
              <Row align="top"  gutter={[8, 16]} justify='space-between'  className="w-full pb-9 h-full" >
                
                {
                  projects.map(({_id, project_name, team, platform})=>(
                    <Col className=' !flex  !h-[280px]' span={7} >
                      <ProjectCardWithActions project_name={project_name} platform={platform} team={team} _id={_id} />
                    </Col>
                  ))
                }
              </Row>
            </TabPane>
            <TabPane tab={
              <Text className='!text-black' >
                  Private(2)
              </Text>
            }
            key="2"
            ></TabPane>
            <TabPane tab={
              <Text className='!text-black' >
                  Public(0)
              </Text>
            }
            key="3"
            ></TabPane>
            <TabPane tab={
              <Text className='!text-black' >
                
                Contributed Projects(1)
              </Text>
            }
            key="4"
            ></TabPane>
      </Tabs>
        
    </ProjectContainer>
  )
}

export default Projects

const ProjectContainer = styled.div`

`