import { Col, Row, Select, Typography } from 'antd'
import { isUndefined } from 'lodash'
import React, { useState } from 'react'
import styled from 'styled-components'
import EmptyAndLoading from '../../components/Containers/EmptyAndLoading'
import Hero from '../../components/Containers/Hero'
import IllustrationExplanation from '../../components/Containers/IllustrationExplanation'
import BugCard from '../../components/DataDisplay/Bugs/BugCard'
import BugUpdate from '../../components/DataDisplay/Bugs/BugUpdate'
import UpdatesCard from '../../components/DataDisplay/Cards/UpdatesCard'
import IssueCard from '../../components/DataDisplay/IssueCard'
import ProjectCard from '../../components/DataDisplay/Projects/ProjectCard'
import ProjectCardWithActions from '../../components/DataDisplay/Projects/ProjectCardWithActions'
import useIssues from '../../hooks/useIssues'
import useProjects from '../../hooks/useProjects'
import useTeams from '../../hooks/useTeams'

const {Text} = Typography
const {Option} = Select

function Dashboard() {
  const [team, select_team] = useState<string>("all")
  const {total_issues, ongoing_issues, closed_issues, issues, is_loading, is_error} = useIssues()

  const {projects, loading, is_error: project_error} = useProjects()

  const {teams} = useTeams()


  return (
    <CustomDash className="flex pt-[60px] flex-col !items-center   justify-start w-full pl-[60px] pr-[20px] h-screen overflow-x-hidden child-container" >
      
      <Col span={24} className="min-w-full  h-full" >
        <div className="flex flex-row items-center  justify-start w-full mb-8 ">
            <Text className="font-medium !text-black text-[36px] text-left"  >
              My Dashboard
            </Text>
        </div>
        <Row className="min-w-full" align="top" justify='space-between' gutter={[16, 24]} >
          <Col span={16}  >
              <Row className="w-full !ml-0 " align="top" justify='space-between' gutter={[16, 16]} >
                <IssueCard content='Total' num={total_issues} color={"#2D55E8"} />
                <IssueCard content='Opened' num={ongoing_issues} color={"#FD9A27"} />
                <IssueCard content='Closed' num={closed_issues} color={"#31C433"} />
              </Row>
                <EmptyAndLoading showLoading={true} loading={is_loading} className="flex bugs-col flex-col items-center justify-start pt-9 w-full h-full" >
                  { 
                    issues.map((issue, key)=>(
                      <BugCard issue={issue} count={key} />  
                    ))
                  }
                </EmptyAndLoading>
               
          </Col>
          <Col span={7} >
            <UpdatesCard/>
          </Col>
                 
            
        </Row>
        <Col span={24} className="w-full !min-h-[500px] h-auto p-[20px_25px_5px_20px]  bg-white rounded-[5px]  border-[0.7px] border-[#e2e2e2] overflow-hidden " >
              <Row className="w-full" align="middle" justify='space-between'  >
                <Col span={4} >
                  <Text className="text-md !text-black font-semibold " >
                    Projects
                  </Text>

                </Col>
                <Col  span={12} ></Col>
                <Col span={3} >
                  <Select onChange={(val)=>{
                    select_team(val as any)
                  }} className="!w-[150px]" defaultValue={["all_teams"]} >
                    <Option value="all" key="all" >
                      All Teams
                    </Option>
                    {
                      teams.map(({team_name})=>(
                        <Option value={team_name} key={team_name} >
                          {team_name}
                        </Option>
                      ))
                    }
                  </Select>
                </Col>
              </Row>

              <EmptyAndLoading showLoading={true} loading={loading}  className="flex projects-list flex-row flex-wrap pt-5 items-start justify-center ">
              {
                  projects.filter(({team: _team})=>_team == team || team == "all").map(({_id, project_name, team, platform, issues: proj_issues})=>(
                    <Col className=' !flex  !h-[280px]' span={7} >
                      <ProjectCardWithActions issues={isUndefined(issues) ? [] : proj_issues as any} project_name={project_name} platform={platform} team={team} _id={_id} />
                    </Col>
                  ))
                }
              </EmptyAndLoading>
        </Col>
      </Col>
    </CustomDash>
  )
}

export default Dashboard


const CustomDash = styled.div`
  .card-row{
    :nth-child(1){
      margin-left: 15px;
    }
  }
  .bugs-col {
    >*{
      margin-bottom: 20px;
    }
  }
  .projects-list{
    >*{
      margin-right: 20px;
      margin-bottom: 10px;
    }
  }
`

const UpdatesContainer = styled(Col)`
  border-radius: 8px;
  border: .7px solid #E2E2E2;
  overflow: hidden;
  padding: 15px;
  height: 100%;
  .updates-container{
    height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar{
      background: none;
      width: 5px;
    }
    &::-webkit-scrollbar-thumb{
      background: #f5f5f5;
      border-radius: 2.5px;
    }
  }
`

