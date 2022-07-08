import { Col, Empty, Row, Tabs, Typography } from 'antd'
import { useAtom } from 'jotai'
import { isUndefined } from 'lodash'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BaseModalContainer from '../../../components/Containers/BaseModalContainer'
import EmptyAndLoading from '../../../components/Containers/EmptyAndLoading'
import Hero from '../../../components/Containers/Hero'
import LeftModalContainer from '../../../components/Containers/LeftModal'
import ProjectCardWithActions from '../../../components/DataDisplay/Projects/ProjectCardWithActions'
import TopSearchContainer, { topSearchContainerAtom } from '../../../components/OneJob/TopSearchContainer'
import useProjects from '../../../hooks/useProjects'
import useTeams from '../../../hooks/useTeams'

const {TabPane} = Tabs
const {Text} = Typography

function Projects() {
  const [isModalVisible, handleModalVisibility] = useState<boolean>(true)
  const [{chosen_team, platform: p}, ] = useAtom(topSearchContainerAtom)
  const [search_filter, set_search_filter] = useState<string>("")
  const hide = () =>{

    handleModalVisibility(false)
  }


  ///////////////////get projects 
  const {projects, loading, error, len} = useProjects()



  return (
    <ProjectContainer className="flex flex-col w-full h-full child-container items-center justify-start">
      
      <div className="w-full flex flex-col items-center h-[300px] justify-center bg-white" >
        <Hero image={["projects", "complete_project", "project_org" ] }more="with our easy to use tool" >
            Make working on your projects easier
          </Hero>
      </div>
      <div className="flex flex-row pb-4 items-center justify-center w-full bg-white">
          <div className="flex flex-row items-center h-full bg-white justify-start w-4/5">
            <TopSearchContainer change_filter={(val: string)=>{
              set_search_filter(val)
            }} />
          </div>
      </div>
     
      <EmptyAndLoading showLoading={true} loading={loading}  className="h-full pt-5 flex w-4/5 flex-row items-start justify-start flex-wrap">
          {
                  projects.filter(({project_name})=>search_filter.trim().length == 0 ? true : project_name?.toLocaleLowerCase().includes(search_filter.toLocaleLowerCase())).filter(({team, platform})=> (chosen_team == team && platform == p) || (chosen_team == "all" && platform == p) || (chosen_team == team && p == "all") || (chosen_team == "all" && p == "all")  ).map(({_id, project_name, team, platform, issues})=>(
                    <Col key={_id} className=' !flex !mr-2 !mb-2   !h-[280px]' span={7} >
                      <ProjectCardWithActions issues={isUndefined(issues) ? [] : issues as any} project_name={project_name} platform={platform} team={team} _id={_id} />
                    </Col>
                  ))
                }
      </EmptyAndLoading >
        
    </ProjectContainer>
  )
}

export default Projects

const ProjectContainer = styled.div`

`