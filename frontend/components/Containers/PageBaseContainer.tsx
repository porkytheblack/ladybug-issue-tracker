import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'

const {Text} = Typography

function PageBaseContainer({children}: {children: ReactNode | ReactNode[]}) {
    const [page_name, set_page_name] = useState<string>("")
    const {pathname } = useRouter()
    useEffect(()=>{
        var n = pathname.replace("/dashboard/", "")
        n = n.indexOf("/") == -1 ? n : n.replace("settings/", "").replace("projects/", "")
        set_page_name(n)
    }, [, pathname])

    const get_link = (crumb: string): string =>{
        if([ "teams", "user", "projects"].includes(crumb)) return `/dashboard/${crumb}`
        if(["issues", "overview", "activity", "settings"].includes(crumb)) return `/dashboard/projects/${crumb}`
        return "/dashboard"
    }
  return (
    <div className="child-container  flex flex-col items-center justify-start p-[30px_28px_40px_28px] w-full h-full">
        <div className="flex flex-row w-full items-center justify-start">
        <Breadcrumb  >
            {
                pathname.split("/").map((item)=>( item !== "dashboard" &&
                    <Breadcrumb.Item className="cursor-pointer" >
                        <Link className='!capitalize' href={get_link(item)} >
                            <Text className='capitalize' >
                            {item}
                            </Text>
                            
                        </Link>
                    </Breadcrumb.Item>
                ))
            }
        </Breadcrumb>
        </div>
       
        <div className="flex flex-row items-center justify-start w-full mb-5">
            <Text className=" text-3xl capitalize font-medium !text-black " >
                {page_name}
            </Text>
        </div>
       
        {children}
    </div>
  )
}

export default PageBaseContainer