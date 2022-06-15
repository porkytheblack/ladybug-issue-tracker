import React, { ReactNode } from 'react'
import styled from 'styled-components'

function BaseLayout({children}:{children: ReactNode | ReactNode[]}) {
  return (
    <BaseLayoutContainer className="w-screen h-full min-h-screen flex  flex-col items-center justify-start" >
            {children}
    </BaseLayoutContainer>
  )
}

export default BaseLayout

const BaseLayoutContainer = styled.div`
`