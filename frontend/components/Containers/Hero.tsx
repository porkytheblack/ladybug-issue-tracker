import { Typography } from 'antd'
import Image from 'next/image'
import React from 'react'

const {Text} = Typography

function Hero({children, image, more}: {children: string,image:string | string[], more: string}) {
  return (
    <div className="w-full p-[20px_10px_10px_40px] flex row items-center justify-between" >
        <Text className="text-3xl text-left w-[300px] !text-black font-bold " >
          {children}
          <br/>
          <Text className="text-normal text-lg" >
            {more}  
          </Text>
        </Text>
        {image instanceof Array ? (<>{
          image.map((src, key)=>(
            <Image src={`/illustrations/${src}.svg`} key={key} width="200px" height="150px" />
          ))
        }</>) : (<Image src={`/illustrations/${image}.svg`} width="200px" height="150px" />)}
        
    </div>
  )
}

export default Hero