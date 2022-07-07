import { MailOutlined } from '@ant-design/icons'
import React from 'react'
import styled from 'styled-components'
import { InboxSchema } from '../../../globaltypes'
import useTeams from '../../../hooks/useTeams'
import { Text } from '../../../pages/_app'
import GeneralAvatar from '../../OneJob/GeneralAvatar'

function InboxCard({inbox, onClick}: {inbox: InboxSchema, onClick: (val: string)=>void}) {
    const {teams} = useTeams()
  return (
    <CardContainer onClick={()=>{
        onClick(inbox._id)
    }} className={`w-full ${inbox.read ? "bg-slate-200" : "bg-slate-100"}  flex cursor-pointer min-h-[80px] flex-row items-center justify-between rounded-lg p-[10px_20px] border-l-2 border-red-600 `} >
        <div className="flex flex-row items-center justify-start">
            <MailOutlined/>
            {inbox.type == "invite" && <Text className="!text-black ml-5  " >
                Invite to join <Text className='font-semibold uppercase !text-black ' >
                    {
                    inbox.invite_content?.team_name
                    }
                </Text>
            </Text>}
            {
                inbox.type == "message" && <Text  className="!text-black ml-5  " ellipsis={true} >
                    {inbox.subject}
                </Text>
            }
        </div>
        <GeneralAvatar avatar={inbox.from.avatar} user_name={inbox.from.user_name}  />
    </CardContainer>
  )
}

export default InboxCard

const CardContainer = styled.div`
    :hover{
        box-shadow: 0 5px 11px rgb(13 61 98 / 19%);
    }
    transition: box-shadow .2s ease-in;
    
    
`