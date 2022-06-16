import React, { ReactNode } from 'react'
import styled from 'styled-components'

function BaseTag({children, severity}: {children: ReactNode | string , severity: "high" | "low" | "medium" | "critical"}) {
  return (
    <BaseTagContainer severity={severity} className="bg-[#ebebeb] flex flex-row items-center justify-center !rounded-[11px] p-[2px_8px] max-w-[60px] " >{children}</BaseTagContainer>
  )
}

export default BaseTag

const BaseTagContainer = styled.div<{severity: "high" | "low" | "medium" | "critical"}>`
    color: ${({severity})=>severity == "critical" ? "var(--ap-severity-critical)" : severity == "high" ? "var(--ap-severity-high)": severity == "medium" ? "var(--ap-severity-medium)" : "var(--ap-severity-low)"} !important;
`