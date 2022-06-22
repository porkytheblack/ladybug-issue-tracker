import React, { ReactNode, useState } from 'react'

function BaseModalContainer({ children ,isVisible, className, hide}: {isVisible: boolean, children: ReactNode | ReactNode[], className: string, hide: ()=> void}) {
    
  return (
    <div id="basemodal_mask"  style={{background: "rgba(0, 0, 0, 0.3)"}} className={` ${ isVisible ? "flex" : "hidden" } ${className} fixed z-20 bg-transparent backdrop-blur-[4px] w-screen h-screen top-0 left-0 `}>
                {children}
    </div>
  )
}

export default BaseModalContainer