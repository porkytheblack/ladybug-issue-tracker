import { Button, Form, Input } from 'antd'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import BaseCard from '../../../components/Containers/BaseCard'
import PageBaseContainer from '../../../components/Containers/PageBaseContainer'
import { is_def_string } from '../../../helpers'
import { userAtom, userInterface } from '../../../jotai/state'

function User() {
  const [user_atom, set_user_atom] = useAtom(userAtom)
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
  return (
    <PageBaseContainer>
      <BaseCard span={24} className="h-full w-full bg-white rounded-[8px]  " >
          <Form fields={[
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
              <Form.Item label="User Name" name="username" >
                <Input type="text" value={user_atom?.user_name} onChange={(e)=>handle_change("user_name", e.target.value)}  placeholder='User Name' />
              </Form.Item>
              <Form.Item label="First Name" name="first_name" >
                <Input type="text" onChange={(e)=>handle_change("first_name", e.target.value)} placeholder='First Name' />
              </Form.Item>
              <Form.Item label="Last Name" name="last_name" >
                <Input type="text" onChange={(e)=>handle_change("last_name", e.target.value)} placeholder='Last Name' />
              </Form.Item>
              <Form.Item label="Email" name="email" >
                <Input type="email" onChange={(e)=>handle_change("user_email", e.target.value)} value={user_atom?.user_email} placeholder='Email' />
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