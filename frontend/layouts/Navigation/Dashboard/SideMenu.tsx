import { AppstoreOutlined, BugOutlined, DashboardFilled, DashboardOutlined, LeftOutlined, LogoutOutlined, MailOutlined, RightOutlined, SettingOutlined, TeamOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, Typography } from 'antd'
import { motion } from 'framer-motion'
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
                <Menu.Item className="!mb-[100px]"  icon={<MailOutlined/>} onClick={()=>{call_change_active("inbox")}}   key="inbox"  >
                    In box
                </Menu.Item>
                
                <Menu.Item key="user" className="!p-0 !flex !flex-col !items-center !w-full  !justify-center" onClick={()=>{call_change_active("user")}}  icon={<Avatar className="!overflow-visible !absolute " src="https://joeschmoe.io/api/v1/jess"  shape='circle' />} >
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
                <li className="h-[20%] flex flex-col items-center justify-center " >
                    <SettingOutlined className="h-9 w-9 text-[36px] "  />
                </li>
                <Menu.Item icon={<TeamOutlined/>} >
                    Teams
                </Menu.Item>
                <Menu.Item icon={<ToolOutlined/>} >
                    Workflows
                </Menu.Item>
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
    box-shadow: 0 0 17px 1px rgba(32,33,36,.1) !important;
    margin-left: ${({menu_state})=>menu_state == "closed" ? "-93.9%" : "0%"};
    .icon-container {
        border-radius: 10px;
        background: rgba(201, 232, 255, 0.9);
    }
    transition: margin .3s ease-in;
`

const MenuContainer = styled.div`

`
