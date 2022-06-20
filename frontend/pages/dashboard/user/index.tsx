import { Button, Form, Input } from 'antd'
import React from 'react'
import BaseCard from '../../../components/Containers/BaseCard'
import PageBaseContainer from '../../../components/Containers/PageBaseContainer'

function User() {
  return (
    <PageBaseContainer>
      <BaseCard span={24} className="h-full w-full bg-white rounded-[8px]  " >
          <Form layout='vertical' className="w-1/2" name="user_details_form" >
              <Form.Item label="User Name" name="username" >
                <Input type="text" placeholder='User Name' />
              </Form.Item>
              <Form.Item label="First Name" name="first_name" >
                <Input type="text" placeholder='First Name' />
              </Form.Item>
              <Form.Item label="Last Name" name="last_name" >
                <Input type="text" placeholder='Last Name' />
              </Form.Item>
              <Form.Item label="Email" name="email" >
                <Input type="email" placeholder='Email' />
              </Form.Item>
              <Form.Item label="Password" name="pass" >
                <Input type="password" placeholder='Enter New Password' />
              </Form.Item>
              <Form.Item  >
                <Button htmlType='submit' >
                  Save Changes
                </Button>
              </Form.Item>
          </Form>
       </BaseCard>
    </PageBaseContainer>
  )
}

export default User