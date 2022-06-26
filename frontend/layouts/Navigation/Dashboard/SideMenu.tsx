import { AppstoreOutlined, BarChartOutlined, BugOutlined, CheckCircleOutlined, DashboardFilled, DashboardOutlined, ExclamationCircleOutlined, LeftOutlined, LogoutOutlined, MailOutlined, RightOutlined, SettingOutlined, TeamOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons'
import { useAuth0 } from '@auth0/auth0-react'
import { Avatar, Menu, Typography } from 'antd'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MenuProps } from 'rc-menu'
import { ItemType } from 'rc-menu/lib/interface'
import React, { Key, ReactNode, useContext, useState } from 'react'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import { userAtom, userAuthTypeAtom } from '../../../jotai/state'
import { deauthenticate_user } from '../../../redux/actions/user.actions'
import { useAppDispatch } from '../../../redux/hooks'
import { active_sub, active_type, DashboardContext } from '../../dashboard_layout'


type MenuItem = Required<MenuProps>['items'][number]

const {Text} = Typography

export interface sub_mens {
    active: string,
    active_icon: ReactNode,
    menus: {
        name: string,
        icon: ReactNode
    }[]
}

const secondary_menu_items: sub_mens[]  = [
    {
        active: "settings",
        active_icon: <SettingOutlined className="h-9 w-9 text-[36px] "  />,
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
    },
    {
        active: "project_sub",
        active_icon: <Image src={`/icons/site.svg`} height="100px" width="110px" />,
        menus: [
            {
                name: "Overview",
                icon: <AppstoreOutlined/>
            },
            {
                name: "Issues",
                icon: <ExclamationCircleOutlined/>
            },
            {
                name: "Activity",
                icon: <CheckCircleOutlined/>
            },
            {
                name: "Settings",
                icon: <SettingOutlined/>
            }
        ]
    }
]




function SideMenu() {
    const {expanded, active, change_active, active_sub} = useContext(DashboardContext)
    const [, set_user_atom] = useAtom(userAtom)
    const [getUserAuthType, setUserAuthType] = useAtom(userAuthTypeAtom)
    const [sub_menu, set_submenu] = useState<"open" | "closed">("open") 
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {logout} = useAuth0()
    const [{access_token}, set_access_token] = useCookies(["access_token"])

    const call_change_active = (a: active_type) =>{
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

    const sub_menu_nav = (a: active_sub) =>{
        if(typeof change_active !== "undefined"){
            if( a !== active) {
                
                if(active == "project_sub"){
                    router.push(`/dashboard/projects/${a}`)
                }else if(active == "teams"){
                    router.push(`/dashboard/teams/${a}`)
                }
             }
        }
    }

    

    const toggle_menu_state = () =>{
        if(sub_menu == "closed"){
            set_submenu("open")
        }else{
            set_submenu("closed")
        }
    }

    const logUserOut = () =>{
        if(getUserAuthType == "auth0"){
            set_user_atom(null)
            logout()
            setUserAuthType("unauthenticated")
        }else{
            set_user_atom(null)
            setUserAuthType("unauthenticated")
        }
        set_access_token("access_token", "")
        setUserAuthType("unauthenticated")
        router.push("/auth")
    }
 
     
  return (
    <MenuContainer className="flex flex-row items-start justify-start h-screen  " >
        <SideMenuContainer theme="dark" activeKey={active}  defaultSelectedKeys={["dashboard"]}  inlineCollapsed={true} className="h-screen " mode="inline" >
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
                <Menu.Item icon={<TeamOutlined/>} onClick={()=>{call_change_active("teams")}}   key="settings"  >
                    Teams
                </Menu.Item>
                
                <Menu.Item key="user" className="!p-0 !flex !flex-col !items-center !w-full  !justify-center" onClick={()=>{call_change_active("user")}}  icon={<Avatar className="!overflow-visible !absolute " src="https://joeschmoe.io/api/v1/jess"  shape='circle' />} >
                    User
                </Menu.Item>
                <Menu.Item key="logout" onClick={logUserOut} icon={<LogoutOutlined/>} >
                    Logout
                </Menu.Item>
        </SideMenuContainer>
                {secondary_menu_items.filter(item=>item.active == active).map(({active, active_icon, menus})=>(
                    <SecondaryMenu  defaultValue={[active_sub]} activeKey={active_sub} menu_state={sub_menu} className="!h-screen relative" mode="inline"  >
                    <a onClick={toggle_menu_state} className="absolute z-10 top-3 flex flex-row items-center justify-center right-[-10px] h-[20px] w-[20px] icon-container" >
                        {sub_menu == "open" ?<LeftOutlined  /> : <RightOutlined/>}
                    </a>
                    <li className="h-[20%] flex flex-col items-center justify-center " >
                        {active_icon}
                    </li>
                    {menus.map(({name, icon})=>(
                            <Menu.Item onClick={()=>{sub_menu_nav(name.toLocaleLowerCase() as active_sub)}} icon={icon} key={name.toLocaleLowerCase()} >
                                {name}
                            </Menu.Item>
                    ))}
                    </SecondaryMenu>
                ))}
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
    width: 250px;
    min-width: 0px;
    box-shadow: 0 0 17px 1px rgba(32,33,36,.1) !important;
    margin-left: ${({menu_state})=>menu_state == "closed" ? "-75.9%" : "0%"};
    .icon-container {
        border-radius: 10px;
        background: rgba(201, 232, 255, 0.9);
    }
    transition: margin .3s ease-in;
`

const MenuContainer = styled.div`

`
