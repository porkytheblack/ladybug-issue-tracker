import { Typography } from 'antd'
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
  return (
    <div className="child-container  flex flex-col items-center justify-start p-[60px_28px_40px_28px] w-full h-full">
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