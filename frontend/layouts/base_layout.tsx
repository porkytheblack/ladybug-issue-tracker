import React, { ReactNode } from 'react'
import styled from 'styled-components'
import BaseModalContainer from '../components/Containers/BaseModalContainer'

function BaseLayout({children}:{children: ReactNode | ReactNode[]}) {
  return (
    <BaseLayoutContainer suppressHydrationWarning className="w-screen relative h-full min-h-screen flex  flex-col items-center justify-start" >
            {children}
            
    </BaseLayoutContainer>
  )
}

export default BaseLayout

const BaseLayoutContainer = styled.div`

`