import { CheckCircleOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Divider, Modal, notification, Select } from 'antd'
import axios from 'axios'
import { atom, useAtom } from 'jotai'
import Image from 'next/image'
import { useForm } from 'rc-field-form'
import React, { useState } from 'react'
import EmptyAndLoading from '../../../components/Containers/EmptyAndLoading'
import PageBaseContainer from '../../../components/Containers/PageBaseContainer'
import InboxCard from '../../../components/DataDisplay/Cards/InboxCard'
import StatCard from '../../../components/DataDisplay/Cards/StatCard'
import Message from '../../../components/Input/Message'
import MessageInput from '../../../components/Input/MessageInput'
import GeneralAvatar from '../../../components/OneJob/GeneralAvatar'
import { backend_url } from '../../../globals'
import { is_def_string } from '../../../helpers'
import useInbox from '../../../hooks/useInbox'
import { tick_up_inbox, userAtom } from '../../../jotai/state'
import { Text } from '../../_app'

const activeInbox = atom<string>("")

function Inbox() {
  const {read_invites, read_messages, unread_invites, unread_messages, total_messages, all} = useInbox()
  const [active_inbox, set_active_inbox] = useAtom(activeInbox)
  const [active_team, set_active_team] = useState<string>("")
  const [message_modal, set_message_modal] = useState<boolean>(false)
  const [message_form] = useForm()
  const [user, ] = useAtom(userAtom)
  const [filter, set_filter] = useState<"read"| "unread" | "pending" | "accepted">("unread")
  const [,up] = useAtom(tick_up_inbox)
  const n = (p: number) =>{
    return (p/total_messages) * 100
  }
  
  const open_inbox_item = (val: string) =>{
    set_active_inbox(val)
    if(!all.filter(({_id})=> _id == val)[0].read){
      axios.put(`${backend_url}/inbox/${val}`, {
        read: true
        }, 
        {
          withCredentials: true
        }
      ).catch((e)=>{
        console.log(e)
        notification.error({
          message: "An error occured",
          key: "error_occured" 
        })
      })
    }
  }

  const submit_invite_choice = (val: any[], team: string) =>{
    axios.put(`${backend_url}/inbox/${active_inbox}`, Object.fromEntries([val]), {
      withCredentials: true
    }).then(()=>{
      if(val[0] == "accepted" && val[1]){
        axios.post(`${backend_url}/team/${team}`, {
          user_name: user?.user_name,
          avatar: user?.avatar
        }, {
          withCredentials: true
        }).then(()=>{
          notification.success({
            message: "Success",
            key: "invite_success"
          })
        }).catch((e)=>{
          console.log(e)
          notification.error({
          message: "An error occured",
          key: "add_member_error"
          })
        })
      }else{
        notification.success({
          message: "Success",
          key: "invite_success"
        })
      }
      
    }).catch((e)=>{
      notification.error({
        message: "An error occured",
        key: "error"
      })
    })
  }


  
  return (
    <PageBaseContainer  >
      <Modal visible={message_modal} onCancel={()=>set_message_modal(false)} footer={null} title="Compose" >
          <MessageInput on_submit={()=>{
            set_message_modal(false)
          }} />
      </Modal>
      <div className="flex flex-col w-full min-h-screen h-full pb-8 bg-white rouned-md">
          <div className="flex flex-row w-full items-center justify-between">
            <StatCard percent={n(unread_messages.length)} description={`${unread_messages.length} Unread Message(s)`} />
            <StatCard percent={n(read_messages.length)} description={`${read_messages.length} Read Message(s)`} />
            <StatCard percent={n(read_invites.length)} description={`${read_invites.length} Read Invite(s)`} />
            <StatCard percent={n(unread_invites.length)} description={`${unread_invites.length} Pening Invite(s)`} />
          </div>
          <div className="flex flex-row w-full pt-5 h-full items-start justify-start">
            <div className="flex flex-col items-start justify-start border-r-2 w-1/2 h-full " >
              <div className="flex flex-row pl-5 pr-5 mb-3 w-full items-center justify-between">
                <Text className="font-semibold !text-black text-xl  " >
                    Inbox
                </Text>
                <Button onClick={()=>{
                  set_message_modal(true)
                }} className='!flex !flex-row !items-center !justify-between' icon={<MailOutlined/>} >
                  Compose
                </Button>
                <Select defaultValue={["pending"]} onChange={(val)=>{
                  set_filter(val as any)
                }} >
                  <Select.Option key="read" >
                    Read
                  </Select.Option>
                  <Select.Option key="unread" >
                    Unread
                  </Select.Option>
                  <Select.Option key="accepted" >
                    Accepted
                  </Select.Option>
                  <Select.Option key="pending" >
                    Pending
                  </Select.Option>
                </Select>
              </div>
              <Divider className='!mt-0' />
                <EmptyAndLoading empty_description={`No ${filter} invites or messages`} className='flex with-scrollbar flex-col p-5 h-[50vh] space-y-2 items-center justify-start w-full ' >
                    {
                      [
                        ...unread_invites,
                        ...unread_messages,
                        ...read_messages,
                        ...read_invites
                      ].filter(({read, accepted})=> filter == "read" ? read : filter == "unread"  ? !read : filter == "accepted" ? accepted : !accepted  ).map((inbox, key)=>(
                        <InboxCard onClick={open_inbox_item} inbox={inbox} key={key} />
                      ))
                    }
                  </EmptyAndLoading>
            </div>
            
            <div className="flex flex-col items-center justify-start w-1/2 h-full p-[0px_20px] ">
                   
                    {
                      active_inbox.length == 0 ? (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                          <Image src={"/illustrations/no_data.svg"} width={200} height={250} />
                          <Text className='!text-black font-semibold text-lg ' >Select a message or invite to view it here</Text>
                        </div>
                      ): (
                        all.filter(({_id})=>_id == active_inbox).map(({from, invite_content, accepted, read, type, msg_content, subject})=>(
                          <>
                          <GeneralAvatar avatar={from.avatar} user_name={from.user_name} />
                          {type == "invite" && <div className="flex flex-col items-center justify-start pt-8">
                            <Text >
                              You have been invited to join <Text className="text-lg font-semibold !text-black" >
                              {invite_content?.team_name}
                                </Text>  
                            </Text>
                            {( !accepted) && <div className="flex mt-8  flex-row items-center justify-center">
                                <Button onClick={()=>{
                                  set_active_team(is_def_string(invite_content?.team_id))
                                  submit_invite_choice(["accepted", true], is_def_string(invite_content?.team_id) )
                                }} >
                                  Accept
                                </Button>
                            </div>}
                            {
                              (read && accepted) && <div className="flex flex-row p-5 items-center justify-center">
                                <CheckCircleOutlined className='text-green-600 text-3xl ' />
                              </div>
                            }
                          </div>}
                          {
                            type == "message" && <Message subject={is_def_string(subject)} msg_content={is_def_string(msg_content)} />
                          }
                          </>
                        ))
                      )
                    }                  
            </div>
            
          </div>
      </div>
    </PageBaseContainer>
  )
}

export default Inbox