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
import { userAtom, userAuthTypeAtom, userInterface } from '../../../jotai/state'
import { Text } from '../../_app'

function User() {
  const [user_atom, set_user_atom] = useAtom(userAtom)
  const [authType,] = useAtom(userAuthTypeAtom)
  const {pathname} = useRouter()
  const handle_change = (type: "user_email" | "user_name" | "first_name" | "last_name", val: any) => {
    var m, n, o, p
    if(user_atom){
      user_atom[type] = is_def_string(val)
    }
    
  }
  useEffect(()=>{ 
    console.log(user_atom)
  }, [,user_atom, pathname])

  const [form] = useForm()

  const handleSubmit= ()=>{
    form.validateFields().then((vals)=>{
      console.log()
      var nvals = {
        user_name:  vals.username,
        first_name: vals.first_name,
        last_name:  vals.last_name,
        email:  vals.email,
        password:   vals.pass
      }
      console.log(nvals)
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
      }).catch((e)=>{
        console.log(e)
        notification.error({
          message: "An error occured",
          key: "update_user_error"
        })
      })
    }).catch((e)=>{
      console.log(e)
      
    })
  }



  return (
    <PageBaseContainer>
      <BaseCard span={24} className="h-full !flex !flex-row !items-start !justify-between w-full bg-white rounded-[8px]  " >
          <Form form={form}
           fields={[
            {
              name: "username",
              value: user_atom !== null ?  user_atom.user_name : ""
            },
            {
              name: "email",
              value: user_atom?.user_email
            },
            {
              name: "first_name",
              value: user_atom?.first_name
            },
            {
              name: "last_name",
              value: user_atom?.last_name
            }
          ]}  onFieldsChange={(changedFields)=>{
            changedFields.forEach(({value, name}, i: number)=>{
                var val: string[] =  name as string[]
                if(user_atom){
                  if(["user_email", "user_name", "last_name", "first_name"].indexOf(val[0]) !== -1){


                    if(val[0] == "user_email"){
                      user_atom[val[0]] = value
                      set_user_atom(user_atom)
                    }
                    if(val[0] == "user_name"){
                      user_atom[val[0]] = value
                      set_user_atom(user_atom)
                    }
                    if(val[0] == "first_name"){
                      user_atom[val[0]] = value
                      set_user_atom(user_atom)
                    }
                    if(val[0] == "last_name"){
                      user_atom[val[0]] = value
                      set_user_atom(user_atom)
                    }


                  }
                  
                }
                
            })
            
          }} layout='vertical' className="w-1/2" name="user_details_form" >
              <Form.Item rules={[{required: true, message: "This is a required field"}]} label="User Name" name="username" >
                <Input disabled={true} type="text" value={user_atom?.user_name} onChange={(e)=>handle_change("user_name", e.target.value)}  placeholder='User Name' />
              </Form.Item>
              <Form.Item label="First Name" name="first_name" >
                <Input type="text" onChange={(e)=>handle_change("first_name", e.target.value)} placeholder='First Name' />
              </Form.Item>
              <Form.Item label="Last Name" name="last_name" >
                <Input type="text" onChange={(e)=>handle_change("last_name", e.target.value)} placeholder='Last Name' />
              </Form.Item>
              <Form.Item rules={[{required: true, message: "This is a required field"}]} label="Email" name="email" >
                <Input type="email" onChange={(e)=>handle_change("user_email", e.target.value)} value={user_atom?.user_email} placeholder='Email' />
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