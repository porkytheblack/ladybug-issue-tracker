import { Tabs, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components'
import Hero from '../../../components/Containers/Hero'
import ProjectCardWithActions from '../../../components/DataDisplay/Projects/ProjectCardWithActions'
import TopSearchContainer from '../../../components/OneJob/TopSearchContainer'

const {TabPane} = Tabs
const {Text} = Typography

function Projects() {
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
                <ProjectCardWithActions/>
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