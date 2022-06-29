import { PlusOutlined, UserAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Input, Modal, notification, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import EmptyAndLoading from '../../../components/Containers/EmptyAndLoading'
import PageBaseContainer from '../../../components/Containers/PageBaseContainer'
import TeamCard from '../../../components/DataDisplay/Cards/TeamCard'
import { backend_url } from '../../../globals'
import useTeams from '../../../hooks/useTeams'
import { tick_up_team } from '../../../jotai/state'

function Teams() {
  const [{
    visible,
    action
  }, set_modal_config ] = useState<{visible: boolean, action: "add"| "edit"}>({
    visible: false,
    action: "add"
  })
    const show_modal = () =>{
      set_modal_config(({visible, action})=>({visible: true, action}))
    }
    const hide_modal = () =>{
      set_modal_config(({visible, action})=>({visible: false, action}))
    }
    const change_action = (_action: "add" | "edit") =>{
      set_modal_config((_)=>({visible: true, action: _action}))
    }
    const edit_team = () =>{
      change_action("edit")
    }

    const [,up] = useAtom(tick_up_team)

    const [form] = useForm()

    const handleSubmit  = () =>{
      form.validateFields().then((vals)=>{
          console.log(vals)
          axios.post(`${backend_url}/team`, vals, {
            withCredentials: true
          }).then((res)=>{
            up()
            notification.success({
              message: "success",
              key: "add_team_success"
            })
            hide_modal()
          }).catch((e)=>{
            notification.error({
              message: "An error occured, try again",
              key: "add_team_error"
            })
          })
      }).catch((e)=>{
        console.log(e)
      })
    }

    //////fetching data

    const {teams} = useTeams()

    /////

  return (
    <PageBaseContainer  >
      <div className="flex flex-col items-center justify-start h-full w-[90%] ">
          <Modal title={action == "add" ? "Create New Team" : "Edit team"}  footer={null} onCancel={hide_modal}  visible={visible}>
                {
                  action == "add" && (
                    <Form form={form}  layout='vertical' className='w-full'  >
                      <Form.Item rules={[
                        {
                          required: true,
                          message: "The team name is required"
                        }
                      ]} name="team_name" >
                          <Input type="string" className="w-full" placeholder='Team Name'  />
                      </Form.Item>  
                      <Form.Item>
                        <Button htmlType='submit' onClick={handleSubmit} >
                          Save
                        </Button>
                      </Form.Item>
                    </Form>
                  )
                }
                {
                  action == "edit" && (
                    <div className="flex flex-col items-center w-full justify-start">
                      <Input placeholder="Team name" type="text" />

                      
                    </div>  

                  )
                }
          </Modal>
          <div className="flex flex-row w-[90%] mt-5 items-center justify-between">
            <Input.Search placeholder='Search Teams' className="w-1/4"  />
            <Button onClick={(e)=>{
                change_action("add")
            }} className=" !text-black !flex items-center justify-center " icon={<PlusOutlined/>} >
              Add Team
            </Button>
          </div>
          <EmptyAndLoading className=" flex flex-row mt-8 w-[90%] h-full flex-wrap items-start justify-start  " >
            
            {
              teams.map(({team_name, team_creator, members})=>(
                <TeamCard team_creator={team_creator} team_name={team_name} members={members}  />
              ))
            }
          </EmptyAndLoading>
      </div>
     
    </PageBaseContainer>
  )
}

export default Teams