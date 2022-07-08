import { Button } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

function Custom404() {
    const {back} = useRouter()
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
        <Image alt="404" src={"/illustrations/404.svg"} width="300px" height="300px" />
        <Button onClick={back} >
            Back
        </Button>
    </div>
  )
}

export default Custom404