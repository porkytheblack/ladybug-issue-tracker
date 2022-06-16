import Image from 'next/image'
import React from 'react'

function Hero({image}: {image:string}) {
  return (
    <div className="w-full h-[300px] flex flex-col items-center justify-center" >
        <Image src={`/illustrations/${image}.svg`} width="400px" height="300px" />
    </div>
  )
}

export default Hero