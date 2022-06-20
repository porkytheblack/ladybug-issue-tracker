import React from 'react'
import styled from 'styled-components'
import { Text } from '../../../pages/_app'
import BaseCard from '../../Containers/BaseCard'
import BugUpdate from '../Bugs/BugUpdate'

function UpdatesCard({className}: {className?: string}) {
  return (
    <BaseCard span={24} className={`bg-white w-full h-full  `} >
        <Text className="text-lg !text-black font-medium" >
            Updates
        </Text>
        <UpdatesContainer className={`w-full ${typeof className!== "undefined" ? className : ""} `} >
            <BugUpdate/>
            <BugUpdate/>
            <BugUpdate/>
            <BugUpdate/>
        </UpdatesContainer>
    </BaseCard>
  )
}

export default UpdatesCard

const UpdatesContainer = styled.div`
max-height: 90vh;
overflow-y: scroll;
padding-right: 3px;
&::-webkit-scrollbar{
  background: none;
  width: 5px;
}
&::-webkit-scrollbar-thumb{
  background: #f5f5f5;
  border-radius: 2.5px;
}
`