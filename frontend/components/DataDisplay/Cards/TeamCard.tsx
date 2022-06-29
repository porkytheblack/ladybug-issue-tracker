import { MoreOutlined } from '@ant-design/icons'
import { Avatar, Button, Divider, Dropdown, Menu, Tooltip } from 'antd'
import { isUndefined } from 'lodash'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { generateRandomColor } from '../../../helpers/randomColor'
import { Text } from '../../../pages/_app'
import BaseCard from '../../Containers/BaseCard'

function TeamCard({
    onClickEdit,
    team_creator,
    team_name,
    members,
    _id
    }:{
    onClickEdit?: ()=>void,
    team_name?: string,
    team_creator?: string,
    _id?: string,
    members?: {
        user_name?: string,
        avatar?: string
    }[]
}) {

    const DropDownMenu = () =>(
        <Menu >
            <Menu.Item key="remove" >
                    Remove
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
            <Dropdown overlay={DropDownMenu} >
                <a onClick={(e)=>e.preventDefault()} className="flex flex-row items-center justify-center p-2 cursor-pointer">
                    <MoreOutlined/>
                </a>
            </Dropdown>
        </div>
        <div className="flex flex-col items-center justify-center w-full pt-4">
            <div className="flex flex-row rounded-full h-10 w-10 overflow-hidden ">
                { !isUndefined(members) && <Image src={(isUndefined(members[0]?.avatar) || members[0]?.avatar.length == 0)? `https://joeschmoe.io/api/v1/${members[0]?.user_name}` : members[0]?.avatar } height={40} width={40} />}
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
                  <Tooltip title={user_name} >
                  {isUndefined(avatar) || avatar.length == 0 ? <Avatar src={`https://joeschmoe.io/api/v1/${user_name}`} />  : <div className="flex flex-row h-10 w-10 items-center justify-center rounded-full overflow-hidden">
                    <Image src={isUndefined(avatar) ? `https://joeschmoe.io/api/v1/${user_name}` : avatar } height={40} width={40} />
                  </div>}
                  </Tooltip>
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