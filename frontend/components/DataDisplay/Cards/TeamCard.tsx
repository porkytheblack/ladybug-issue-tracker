import { MoreOutlined } from '@ant-design/icons'
import { Avatar, Button, Divider, Dropdown, Menu } from 'antd'
import React from 'react'
import { Text } from '../../../pages/_app'
import BaseCard from '../../Containers/BaseCard'

function TeamCard({onClickEdit}:{onClickEdit?: ()=>void}) {
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
                bug-tracker
            </Text>
            <Dropdown overlay={DropDownMenu} >
                <a onClick={(e)=>e.preventDefault()} className="flex flex-row items-center justify-center p-2 cursor-pointer">
                    <MoreOutlined/>
                </a>
            </Dropdown>
        </div>
        <div className="flex flex-col items-center justify-center w-full pt-4">
            <Avatar size="large" src="https://joeschmoe.io/api/v1/random" />
            <Text className="pt-2" >
                    porkytheblack@gmail.com
            </Text>
        </div>
        <Divider type="horizontal" />
        <div className="flex flex-row items-center justify-center w-full p-2">
            <Avatar.Group>
                <Avatar  src="https://joeschmoe.io/api/v1/jess"  />
                <Avatar  src="https://joeschmoe.io/api/v1/joe"  />
                <Avatar src="https://joeschmoe.io/api/v1/random"  />
            </Avatar.Group>
        </div>
    </BaseCard>
  )
}

export default TeamCard