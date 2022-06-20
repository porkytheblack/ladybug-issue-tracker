import { Button, Form, Input, Select } from 'antd'
import React from 'react'
import PageBaseContainer from '../../../../components/Containers/PageBaseContainer'
import { Text } from '../../../_app'

function Settings() {
  return (
    <PageBaseContainer>
      <div className="flex bg-white rounded-[10px] p-[20px] flex-col w-full items-start justify-start">
        <Text className="!text-black text-xl font-medium mb-6  " >
          Update project details
        </Text>
        <Form name="update_project_details" layout='vertical'  >
          <Form.Item name="project_name" label="Project Name" labelAlign='left' >
              <Input type="text" placeholder='Project Name' />
          </Form.Item>
          <Form.Item name="issue_prefix" label="Issue Prefix" labelAlign='left' >
              <Input type="text" placeholder='Issue Prefix' />
          </Form.Item>
          <Form.Item name="project_platform" label="Project Platform" labelAlign='left' >
              <Select defaultValue={["android"]} >
                <Select.Option key="android" >
                  Android
                </Select.Option>
                <Select.Option key="ios" >
                  IOS
                </Select.Option>
                <Select.Option key="desktop" >
                  Desktop
                </Select.Option>
                <Select.Option key="web" >
                  Web
                </Select.Option>
              </Select>
          </Form.Item>
          <Form.Item>
            <Form.Item noStyle >
              <Button htmlType='submit' >
                Save
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    </PageBaseContainer>
  )
}

export default Settings   