import { Avatar, Button, Checkbox, Divider, Form, Input, notification, Radio } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import axios from 'axios'
import { useAtom } from 'jotai'
import _ from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import BaseCard from '../../../components/Containers/BaseCard'
import PageBaseContainer from '../../../components/Containers/PageBaseContainer'
import SelectAvatar from '../../../components/Input/SelectAvatar'
import { backend_url, the_schmoes } from '../../../globals'
import { is_def_string } from '../../../helpers'
import userAuth from '../../../hooks/userAuth'
import { userAtom, userAuthTypeAtom, userInterface } from '../../../jotai/state'
import { Text } from '../../_app'

function User() {
  const [user_atom, set_user_atom] = useAtom(userAtom)
  const [authType,] = useAtom(userAuthTypeAtom)
  const {user, up} = userAuth()
 

  const [form] = useForm()

  useEffect(()=>{
    form.setFieldsValue([
      {
        username: "donny"
      }
    ])
  }, [,user])

  const handleSubmit= ()=>{
    form.validateFields().then((vals)=>{
      var nvals = {
        user_name:  vals.username,
        first_name: vals.first_name,
        last_name:  vals.last_name,
        email:  vals.email,
        password:   vals.pass
      }
      axios.put(`${backend_url}/user`, Object.fromEntries(Object.entries(nvals).filter(([key, val]:[key: string, val: string])=>val !== undefined && val.length !== 0)), {
        withCredentials: true
      }).then(()=>{
        set_user_atom({
          user_name: vals.username,
          user_email: vals.email,
          first_name: vals.first_name,
          last_name: vals.last_name,
          avatar: user_atom?.avatar as any
        })
        notification.success({
          message: "Success",
          key: "success_updating_user"
        })
        up()
      }).catch((e)=>{
        notification.error({
          message: "An error occured",
          key: "update_user_error"
        })
      })
    }).catch((e)=>{
      
    })
  }



  return (
    <PageBaseContainer>
      <BaseCard span={24} className="h-full !flex !flex-row !items-start !justify-between w-full bg-white rounded-[8px]  " >
          <Form form={form}
            layout='vertical' className="w-1/2" name="user_details_form" 
            fields={[
              {
                name: ["first_name"],
                value: user?.first_name
              },
              {
                name: "username",
                value: user?.user_name
              },
              {
                name: "last_name",
                value: user?.last_name
              },
              {
                name: "email",
                value: user?.email
              }
            ]}
            >
              <Form.Item  rules={[{required: true, message: "This is a required field"}]} label="User Name" name="username" >
                <Input disabled={true} type="text"   placeholder='User Name' />
              </Form.Item>
              <Form.Item initialValue={user?.first_name} label="First Name" name="first_name" >
                <Input type="text"  placeholder='First Name' />
              </Form.Item>
              <Form.Item initialValue={user?.last_name} label="Last Name" name="last_name" >
                <Input type="text"  placeholder='Last Name' />
              </Form.Item>
              <Form.Item initialValue={user?.email} label="Email" name="email" >
                <Input type="email"  placeholder='Email' />
              </Form.Item>
              <Form.Item  label="New Password" name="pass" >
                <Input disabled={authType !== "normal"} type="password" placeholder='Enter New Password' />
              </Form.Item>
              <Form.Item  >
                <Button onClick={handleSubmit} htmlType='submit' >
                  Save Changes
                </Button>
              </Form.Item>
          </Form>
          <div className="flex flex-col items-center justify-start w-[40%] " >
            <Text className='w-full text-center text-lg font-semibold ' >
                Choose an avatar
            </Text>
            <Divider/>
            <SelectAvatar/>
          </div>
       </BaseCard>
    </PageBaseContainer>
  )
}

export default User