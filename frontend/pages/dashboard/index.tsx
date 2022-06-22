import { Col, Row, Select, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components'
import Hero from '../../components/Containers/Hero'
import IllustrationExplanation from '../../components/Containers/IllustrationExplanation'
import BugCard from '../../components/DataDisplay/Bugs/BugCard'
import BugUpdate from '../../components/DataDisplay/Bugs/BugUpdate'
import IssueCard from '../../components/DataDisplay/IssueCard'
import ProjectCard from '../../components/DataDisplay/Projects/ProjectCard'

const {Text} = Typography
const {Option} = Select

function Dashboard() {
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
                <IssueCard content='Total' num={4} color={"#2D55E8"} />
                <IssueCard content='Opened' num={4} color={"#FD9A27"} />
                <IssueCard content='Closed' num={0} color={"#31C433"} />
              </Row>
              <div className="flex bugs-col flex-col items-center justify-start pt-9 w-full h-full">
                <BugCard/>
                <BugCard/>
                <BugCard/>
                <BugCard/>
              </div>
          </Col>
          <UpdatesContainer className=" bg-white h-full p-[10px] " span={7} >
              <div className="flex flex-row items-center mb-1 justify-start w-full">
                  <Text className='!text-black text-lg ' >
                    Updates
                  </Text>
              </div>
              <div className="flex pl-2 pt-5 flex-col updates-container w-full">
                  {/* <IllustrationExplanation illustration='empty' >
                        No recent updates
                  </IllustrationExplanation> */}
                  <BugUpdate/>
                  <BugUpdate/>
                  <BugUpdate/>
              </div>
          </UpdatesContainer>
        </Row>
        <Col span={24} className="w-full h-auto p-[20px_25px_5px_20px]  bg-white rounded-[5px]  border-[0.7px] border-[#e2e2e2] overflow-hidden " >
              <Row className="w-full" align="middle" justify='space-between'  >
                <Col span={4} >
                  <Text className="text-md !text-black font-semibold " >
                    Projects
                  </Text>

                </Col>
                <Col  span={12} ></Col>
                <Col span={3} >
                  <Select className="!w-[150px]" defaultValue={["all_teams"]} >
                    <Option value="all_teams" key="all_teams" >
                      All Teams
                    </Option>
                    <Option value="d_house_dev" key="d_house_dev" >
                      d_house_dev
                    </Option>
                  </Select>
                </Col>
                <Col span={3} >
                  <Select defaultValue={["active"]} className="!w-[150px]" defaultActiveFirstOption >
                    <Option value="active" key="active" >
                      Active
                    </Option>
                    <Option value="all" key="all" >
                      All
                    </Option>
                    <Option value="archived" key="archived" >
                      Archived
                    </Option>
                  </Select>
                </Col>
              </Row>

              <div className="flex projects-list flex-row flex-wrap pt-5 items-start justify-center ">
                    <ProjectCard project_name='bugtracker' project_type='site' />
                    <ProjectCard project_name='bugtracker' project_type='server' />
                    <ProjectCard project_name='bugtracker' project_type='database' />
                    <ProjectCard project_name='bugtracker' project_type='app' />
                    <ProjectCard project_name='bugtracker' project_type='site' />
                    <ProjectCard project_name='bugtracker' project_type='server' />
                    <ProjectCard project_name='bugtracker' project_type='database' />
                    <ProjectCard project_name='bugtracker' project_type='app' />
                    <ProjectCard project_name='bugtracker' project_type='site' />
                    <ProjectCard project_name='bugtracker' project_type='server' />
                    <ProjectCard project_name='bugtracker' project_type='database' />
                    <ProjectCard project_name='bugtracker' project_type='app' />
                    <ProjectCard project_name='bugtracker' project_type='site' />
                    <ProjectCard project_name='bugtracker' project_type='server' />
                    <ProjectCard project_name='bugtracker' project_type='database' />
                    <ProjectCard project_name='bugtracker' project_type='app' />
              </div>
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

