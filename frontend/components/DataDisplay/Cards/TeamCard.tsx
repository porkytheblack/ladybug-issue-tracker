import { MoreOutlined } from '@ant-design/icons'
import { Avatar, Button, Divider, Dropdown, Menu, Tooltip } from 'antd'
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
        user_name: string,
        avatar: string
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
    <BaseCard span={7} className="!flex !flex-col mr-5 !items-center !justify-center !bg-white " >
        <div className="flex flex-row w-full items-center justify-between">
            <Text className="text-lg font-semibold !text-black " >
                {team_name}
            </Text>
            <Dropdown overlay={DropDownMenu} >
                <a onClick={(e)=>e.preventDefault()} className="flex flex-row items-center justify-center p-2 cursor-pointer">
                    <MoreOutlined/>
                </a>
            </Dropdown>
        </div>
        <div className="flex flex-col items-center justify-center w-full pt-4">
                        <CustomAvatar style={{padding: 0}}   >
                             <Image referrerPolicy='no-referrer' src={typeof members !== "undefined"  ?members[0]?.avatar : ''} height="40px" width={"40px"}  />
                        </CustomAvatar>
            <Text className="pt-2" >
                    {team_creator}
            </Text>
        </div>
        <Divider type="horizontal" />
        <div className="flex flex-row items-center justify-center w-full p-2">
            <Avatar.Group>
                {
                    members?.map(({
                        user_name,
                        avatar
                    })=> avatar.length > 0 ? (
                        <Tooltip title={user_name} >
                        <CustomAvatar style={{padding: 0}}   >
                             <Image referrerPolicy='no-referrer' src={avatar} height="40px" width={"40px"}  />
                        </CustomAvatar>
                        </Tooltip>
                    ): (
                        <Tooltip title={user_name} >
                            <Avatar style={{backgroundColor: generateRandomColor()}} >
                                {user_name.toLocaleUpperCase()[0]}
                            </Avatar>
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