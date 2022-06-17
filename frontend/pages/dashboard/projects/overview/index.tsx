import { Col, Row } from 'antd'
import React from 'react'
import PageBaseContainer from '../../../../components/Containers/PageBaseContainer'
import IssueStatusCard from '../../../../components/DataDisplay/Cards/IssueStatusCard'
import OsCoverage from '../../../../components/DataDisplay/Cards/OsCoverage'
import SeverityCard from '../../../../components/DataDisplay/Cards/SeverityCard'
import TagsCard from '../../../../components/DataDisplay/Cards/TagsCard'
import TopIssues from '../../../../components/DataDisplay/Cards/TopIssues'
import UpdatesCard from '../../../../components/DataDisplay/Cards/UpdatesCard'

function Overview() {
  return (
    <PageBaseContainer>
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
    </PageBaseContainer>
  )
}

export default Overview