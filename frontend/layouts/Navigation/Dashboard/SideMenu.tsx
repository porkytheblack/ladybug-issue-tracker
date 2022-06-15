import { AppstoreOutlined, BugOutlined, DashboardFilled, DashboardOutlined, LeftOutlined, LogoutOutlined, MailOutlined, RightOutlined, SettingOutlined, TeamOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, Typography } from 'antd'
import MenuItem from 'antd/lib/menu/MenuItem'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MenuProps } from 'rc-menu'
import { ItemType } from 'rc-menu/lib/interface'
import React, { Key, ReactNode, useContext, useState } from 'react'
import styled from 'styled-components'
import { DashboardContext } from '../../dashboard_layout'


type MenuItem = Required<MenuProps>['items'][number]

const {Text} = Typography

const secondary_menu_items = [
    {
        active: "workflows",
        menus: [
            {
                name: "Teams",
                icon: <TeamOutlined/>
            },
            {
                name: "Workflows",
                icon: <ToolOutlined/>
            }
        ]
    }
]




function SideMenu() {
    const {expanded, active, change_active} = useContext(DashboardContext)
    const [sub_menu, set_submenu] = useState<"open" | "closed">("open") 
    const router = useRouter()
    
    const call_change_active = (a: "dashboard" | "settings" | "inbox" | "projects" | "user") =>{
        if(typeof change_active !== "undefined"){
            if( a !== active ){
                change_active(a)
                if(a == "dashboard"){
                    router.push(`/${a}`)
                }else {
                    router.push(`/dashboard/${a}`)
                }
                
            }
            
        }
    }

    const logout = () =>{

    }

    const toggle_menu_state = () =>{
        if(sub_menu == "closed"){
            set_submenu("open")
        }else{
            set_submenu("closed")
        }
    }

     
  return (
    <MenuContainer className="flex flex-row items-start justify-start h-screen  " >
        <SideMenuContainer theme="dark" defaultSelectedKeys={["dashboard"]}  inlineCollapsed={true} className="h-screen " mode="inline" >
                <li className="w-full   flex flex-col items-center justify-center  !h-[30%]" >
                        <Text className="font-sans font-bold text-lg " >
                                <Image src="/icons/logo.svg" className="hover:cursor-pointer" width="40px" height="42.5px" />
                        </Text>
                </li>
                <Menu.Item onClick={()=>{call_change_active("dashboard")}}  icon={<UserOutlined  />} key="dashboard"  >
                    Dashboard
                </Menu.Item>
                <Menu.Item onClick={()=>{call_change_active("projects")}}    icon={<AppstoreOutlined  />} key="projects"  >
                    Projects
                </Menu.Item>
                <Menu.Item icon={<SettingOutlined/>} onClick={()=>{call_change_active("settings")}}   key="settings"  >
                    Settings
                </Menu.Item>
                <Menu.Item  icon={<MailOutlined/>} onClick={()=>{call_change_active("inbox")}}   key="inbox"  >
                    In box
                </Menu.Item>
                <li className='h-[10%]' ></li>
                <Menu.Item key="user" onClick={()=>{call_change_active("user")}}  icon={<Avatar src="https://joeschmoe.io/api/v1/jess" size="large" shape='circle' />} >
                    User
                </Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined/>} >
                    Logout
                </Menu.Item>
        </SideMenuContainer>
        {active == "settings" && <SecondaryMenu menu_state={sub_menu} className="!h-screen relative" mode="inline"  >
                <a onClick={toggle_menu_state} className="absolute z-10 top-3 flex flex-row items-center justify-center right-[-10px] h-[20px] w-[20px] icon-container" >
                    {sub_menu == "open" ?<LeftOutlined  /> : <RightOutlined/>}
                </a>
                <li className="h-[20%]" ></li>
                <MenuItem icon={<TeamOutlined/>} >
                    Teams
                </MenuItem>
                <MenuItem icon={<ToolOutlined/>} >
                    Workflows
                </MenuItem>
        </SecondaryMenu>}
    </MenuContainer>
  )
}

export default SideMenu

const SideMenuContainer = styled(Menu)`
    z-index: 5;
    max-width: 200px;
    min-width: 0px;
`
const SecondaryMenu = styled(Menu)<{menu_state: "open"  | "closed" }>`
    max-width: 200px;
    min-width: 0px;
    margin-left: ${({menu_state})=>menu_state == "closed" ? "-93.9%" : "0%"};
    .icon-container {
        border-radius: 10px;
        background: rgba(201, 232, 255, 0.9);
    }
`

const MenuContainer = styled.div`

`
