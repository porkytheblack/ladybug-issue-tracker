import React, { ReactNode } from 'react'
import styled from 'styled-components'

function DashboardLayout({children}: {children: ReactNode | ReactNode[]}) {
  return (
    <DashboardLayoutContainer className=" flex flex-col items-center justify-start w-screen h-screen overflow-x-hidden overflow-y-scroll" >
        {children}
    </DashboardLayoutContainer>
  )
}

export default DashboardLayout

const DashboardLayoutContainer = styled.div`

`