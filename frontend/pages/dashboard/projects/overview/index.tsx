import { Col, Row } from 'antd'
import Image from 'next/image'
import React from 'react'
import PageBaseContainer from '../../../../components/Containers/PageBaseContainer'
import IssueStatusCard from '../../../../components/DataDisplay/Cards/IssueStatusCard'
import OsCoverage from '../../../../components/DataDisplay/Cards/OsCoverage'
import SeverityCard from '../../../../components/DataDisplay/Cards/SeverityCard'
import TagsCard from '../../../../components/DataDisplay/Cards/TagsCard'
import TopIssues from '../../../../components/DataDisplay/Cards/TopIssues'
import UpdatesCard from '../../../../components/DataDisplay/Cards/UpdatesCard'
import useIssues from '../../../../hooks/useIssues'
import useProject from '../../../../hooks/useProject'
import { Text } from '../../../_app'

function Overview() {
  const project = useProject()
  const {total_issues} = useIssues()
  return (
    <PageBaseContainer>
        {total_issues > 0 ? <>
          <Row className="w-full mb-5 " align="top" justify='space-between' >
            <IssueStatusCard/>
            <SeverityCard/>
            <TagsCard/>
          </Row>  
          <Row className="w-full" align="top" justify='space-between' >
            <Col span={15} >
                <OsCoverage/>
                <TopIssues/>
            </Col>
            <Col span={8} >
              <UpdatesCard/>
            </Col>
          </Row>
        </> : <div className="flex flex-col items-center justify-center w-full h-full" >
                <Image width={250} height={300} src={"/illustrations/no_data.svg"} />
                <Text className="flex !text-black font-semibold text-2xl " >
                  Nothing to see here!
                </Text>
          </div>}
    </PageBaseContainer>
  )
}

export default Overview