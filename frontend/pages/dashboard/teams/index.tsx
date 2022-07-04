import { PlusOutlined, UserAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Input, Modal, notification, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import axios from 'axios'
import { useAtom } from 'jotai'
import { flatten, isUndefined } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import EmptyAndLoading from '../../../components/Containers/EmptyAndLoading'
import PageBaseContainer from '../../../components/Containers/PageBaseContainer'
import TeamCard from '../../../components/DataDisplay/Cards/TeamCard'
import GeneralAvatar from '../../../components/OneJob/GeneralAvatar'
import { backend_url } from '../../../globals'
import { is_def_string } from '../../../helpers'
import useTeams from '../../../hooks/useTeams'
import { tick_up_team, userAtom } from '../../../jotai/state'
import { Text } from '../../_app'

function Teams() {
  const [{
    visible,
    action
  }, set_modal_config ] = useState<{visible: boolean, action: "add"| "edit"}>({
    visible: false,
    action: "add"
  })
    const [user, set_user] = useAtom(userAtom)
    const [team_name, set_team_name] = useState<string>("")
    const [editable_name, set_editable_name] = useState<string>("")
    const [team_member, set_team_member] = useState<string>("")
    const [active_team, set_active_team] = useState<string>("")
    const [search_filter, set_search_filter] = useState<string>("")
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

    useEffect(()=>{
      console.log(teams.filter(({team_name})=> search_filter.trim().length > 0 ? team_name?.includes(search_filter.trim()): true))
    }, [,search_filter])

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

    const send_invitation = () =>{
      if (flatten(teams.filter((team)=>team.team_name == team_name)[0].members?.filter(({user_name})=>user_name == team_name)).length !== 0) return null
      axios.post(`${backend_url}/inbox`,  {
        to: team_member,
        type: "invite",
        invite_type: "team",
        invite_content: {
          team_id: active_team,
          team_name
        }
      }, {
        withCredentials: true
      }).then(()=>{
        notification.success({
          message: "Success",
          key: "inbox_success"
        })
      }).catch((e)=>{
        console.log(e)
        notification.error({
          message: "An Error Occured",
          key: "inbox_error"
        })
      })
    }

    const update_team = () =>{
      if(editable_name == team_name) return ()=>{}
      axios.put(`${backend_url}/team/${active_team}`, {
        team_name: editable_name
      }, {
        withCredentials: true
      }).then(()=>{
        notification.success({
          message: "Success",
          key: "update_team_success"
        })
      }).catch((e)=>{
        console.log(e)
        notification.error({
          message: "An Error Occured",
          key: "update_team_name_error"
        })
      })
    }

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
                      <Input.Group compact >
                        <Input value={editable_name} onChange={(e)=>{
                          set_editable_name(e.target.value)
                        }} className="!w-[60%]" placeholder="Team name" type="text" />
                        <Button onClick={update_team} >
                          Submit
                        </Button>
                      </Input.Group>
                      
                      
                      <div className="flex w-full flex-col items-center">
                        
                        <Input.Group className='mt-5' compact >
                         <Input value={team_member} onChange={(e)=>{
                          set_team_member(e.target.value)
                         }}  style={{
                          width: "60%"
                         }} placeholder='Enter username' />
                         <Button onClick={send_invitation} >
                            Invite
                         </Button>
                        </Input.Group>
                        <div className="flex flex-col mt-5 w-full items-start justify-start">
                          <Text className='!text-black font-semibold text-xl ' >
                            Members
                          </Text>
                          {
                            teams.filter((team)=>team.team_name == team_name)[0].members?.map(({user_name, avatar})=>(
                              <div className="flex flex-row w-full items-center justify_start">
                                <GeneralAvatar avatar={avatar} user_name={user_name} />
                                <Text className='!text-black ml-5 ' >
                                     @ {user_name}
                                </Text>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                      
                    </div>  

                  )
                }
          </Modal>
          
          

          <div className="flex flex-row w-[90%] mt-5 items-center justify-between">
            <Input.Search value={search_filter} onChange={(e)=>{
              set_search_filter(e.target.value)
            }} placeholder='Search Teams' className="w-1/4"  />
            <Button onClick={(e)=>{
                change_action("add")
            }} className=" !text-black !flex items-center justify-center " icon={<PlusOutlined/>} >
              Add Team
            </Button>
          </div>
          <EmptyAndLoading className=" flex flex-row mt-8 w-[90%] h-full flex-wrap items-start justify-start  " >
            
            {
              teams.filter(({team_name})=> search_filter.trim().length > 0 ? team_name?.toLocaleLowerCase().includes(search_filter.toLocaleLowerCase(), 0): true).map(({team_name, team_creator, members, _id})=>(
                <TeamCard onClickEdit={()=>{
                  change_action("edit")
                  set_team_name(is_def_string(team_name))
                  set_active_team(is_def_string(_id))
                  set_editable_name(is_def_string(team_name))
                }} up={up} team_creator={team_creator} _id={_id} team_name={team_name} members={members}  />
              ))
            }
          </EmptyAndLoading>
      </div>
     
    </PageBaseContainer>
  )
}

export default Teams