import { AndroidOutlined, AppleOutlined, DesktopOutlined, GlobalOutlined } from '@ant-design/icons'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { is_def_string } from '../../helpers'

function Platform({platform}:{platform?: string}) {
    var plat =  is_def_string(platform).toLocaleLowerCase()
  return (
    <PlatformContainer className="flex flex-row items-center justify-center">
        {
            plat == "desktop" ? <DesktopOutlined className='icon' /> :
            plat == "android" ? <AndroidOutlined className='icon' /> :
            plat == "ios" ? <AppleOutlined className='icon' /> :
            plat == "web" ? <GlobalOutlined className='icon' />: <Image alt={"wearable"} src="/icons/wearable.svg" width={48} height={48} />
        }
    </PlatformContainer>
  )
}

export default Platform

const PlatformContainer = styled.div`
    .icon{
        font-size: 48px;
    }
`