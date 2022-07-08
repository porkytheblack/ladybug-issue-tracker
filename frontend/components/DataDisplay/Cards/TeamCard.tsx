import { MoreOutlined } from '@ant-design/icons'
import { Avatar, Button, Divider, Dropdown, Menu, notification, Tooltip } from 'antd'
import axios from 'axios'
import { useAtom } from 'jotai'
import { isUndefined } from 'lodash'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { backend_url } from '../../../globals'
import { generateRandomColor } from '../../../helpers/randomColor'
import useProjects from '../../../hooks/useProjects'
import { userAtom } from '../../../jotai/state'
import { Text } from '../../../pages/_app'
import BaseCard from '../../Containers/BaseCard'
import GeneralAvatar from '../../OneJob/GeneralAvatar'

function TeamCard({
    onClickEdit,
    team_creator,
    team_name,
    members,
    _id,
    up
    }:{
    onClickEdit?: ()=>void,
    team_name?: string,
    team_creator?: string,
    _id?: string,
    members?: {
        user_name?: string,
        avatar?: string
    }[],
    up?: ()=>void
}) {
    const {projects} = useProjects()
    const [user, ] = useAtom(userAtom)
    const delete_team = () =>{
        if( projects.filter(({team_id})=>team_id == _id).length == 0 ){
            axios.delete(`${backend_url}/team/${_id}`, {
                withCredentials: true
            }).then(()=>{
                if(!isUndefined(up)) up()
                notification.success({
                    message: "Deleted team successfully",
                    key: "deletion success"
                })
            }).catch((e)=>{
                console.log(e)
                notification.error({
                    message: "An error occured",
                    key: "delete_team_error"
                })
            })
        }else{
            notification.info({
                message: "This team is still being used",
                key: "team_being used"
            })
        }
        
    }
    const DropDownMenu = () =>(
        <Menu >
            <Menu.Item onClick={delete_team} key="remove" >
                    Delete
            </Menu.Item>
            <Menu.Item onClick={onClickEdit} key="edit" >
                    Edit
            </Menu.Item>
        </Menu>
    )
  return (
    <BaseCard span={7} className="!flex !flex-col mr-5 mb-5 !items-center p-2 !justify-center !bg-white " >
        <div className="flex flex-row w-full items-center justify-between">
            <Text className="text-lg font-semibold !text-black uppercase " >
                {team_name}
            </Text>
            { team_creator == user?.user_name && <Dropdown overlay={DropDownMenu} >
                <a onClick={(e)=>e.preventDefault()} className="flex flex-row items-center justify-center p-2 cursor-pointer">
                    <MoreOutlined/>
                </a>
            </Dropdown>}
        </div>
        <div className="flex flex-col items-center justify-center w-full pt-4">
            <div className="flex flex-row rounded-full h-10 w-10 overflow-hidden ">
            <GeneralAvatar avatar={!isUndefined(members) ?  members[0]?.avatar : ""} user_name={!isUndefined(members) ?  members[0]?.user_name : ""} />
            </div>
            <Text className="pt-2" >
                    {team_creator}
            </Text>
        </div>
        <Divider type="horizontal" />
        <div className="flex flex-row items-center justify-center w-full p-2">
        <Avatar.Group>
              {
                !isUndefined(members) && members.map(({user_name, avatar})=>(
                  <GeneralAvatar key={user_name} user_name={user_name} avatar={avatar} />
                ))
              }
            </Avatar.Group>
        </div>
    </BaseCard>
  )
}

export default TeamCard 


const CustomAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    overflow: hidden;
`