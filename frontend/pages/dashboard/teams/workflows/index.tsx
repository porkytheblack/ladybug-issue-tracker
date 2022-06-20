import { Form, Input, Select } from 'antd'
import React from 'react'
import BaseCard from '../../../../components/Containers/BaseCard'
import PageBaseContainer from '../../../../components/Containers/PageBaseContainer'
import { Text } from '../../../_app'

function Workflows() {
  return (
    <PageBaseContainer>
      <BaseCard span={24} className="w-full bg-white" >
        <div className="flex flex-row items-center justify-start">
          <Text className="!text-black font-medium text-xl mr-3 " >
            Setup a workflow for 
          </Text>
          <Select className="w-1/4" defaultValue={["d_house_dev"]} >
            <Select.Option key="d_house_dev" >
              d_house_dev
            </Select.Option>
            <Select.Option key="team_b">
              Team B
            </Select.Option>
          </Select>
        </div>
        <div className="flex flex-row  items-start justify-start w-full mt-5">
          <Form name="status" layout='vertical'  >
            <Form.Item name="new_status" label="New Status" className='!mb-1'  >
              <Input type="text" placeholder="New Status" />
            </Form.Item>
            <Form.Item name="color" label="Status Color" >
              <Input type={"color"} className="w-[60px]" bordered={false}  />
            </Form.Item>
          </Form>
        </div>
      </BaseCard>
      
    </PageBaseContainer>
  )
}

export default Workflows