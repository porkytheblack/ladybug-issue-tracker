import { Col, Row, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components'
import Hero from '../../components/Containers/Hero'
import IllustrationExplanation from '../../components/Containers/IllustrationExplanation'
import IssueCard from '../../components/DataDisplay/IssueCard'

const {Text} = Typography

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
          </Col>
          <UpdatesContainer className=" bg-white h-screen p-[10px] " span={7} >
              <div className="flex flex-row items-center mb-1 justify-start w-full">
                  <Text className='!text-black text-lg ' >
                    Updates
                  </Text>
              </div>
              <div className="flex flex-col updates-container w-full">
                  <IllustrationExplanation illustration='empty' >
                        No recent updates
                  </IllustrationExplanation>
              </div>
          </UpdatesContainer>
        </Row>
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
`

const UpdatesContainer = styled(Col)`
  border-radius: 8px;
  border: .7px solid #E2E2E2;
  overflow: hidden;
  padding: 15px;
  height: 100%;
  .updates-container{
    height: 600px;
    overflow-y: scroll;
    &::-webkit-scrollbar{
      background: none;
      width: 5px;
    }
    &::-webkit-scrollbar-thumb{
      background: #3a3b45;
      border-radius: 2.5px;
    }
  }
`

