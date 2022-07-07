import { isString } from 'lodash'
import React from 'react'
import styled from 'styled-components'
import { extCommentInterface } from '../../../globaltypes'
import useIssues from '../../../hooks/useIssues'
import { Text } from '../../../pages/_app'
import BaseCard from '../../Containers/BaseCard'
import EmptyAndLoading from '../../Containers/EmptyAndLoading'
import BugUpdate from '../Bugs/BugUpdate'

function UpdatesCard({className, maxHeight}: {className?: string, maxHeight?: string}) {
  const {comments, is_loading, is_error} = useIssues()
  return (
    <BaseCard span={24} className={`bg-white w-full h-full  `} >
        <Text className="text-lg !text-black font-medium" >
            Updates
        </Text>
        <UpdatesContainer maxHeight={maxHeight} className={`w-full ${typeof className!== "undefined" ? className : ""} `} >
          <EmptyAndLoading showLoading={true} loading={is_loading} className="w-full h-full" >
          {
              comments?.map((comment, index) =>(
                <BugUpdate  comment={comment} key={index} num={index} />
              ))
            }
          </EmptyAndLoading>
            
            
        </UpdatesContainer>
    </BaseCard>
  )
}

export default UpdatesCard

const UpdatesContainer = styled.div<{maxHeight?: string}>`
height: ${({maxHeight})=>isString(maxHeight) ? `${maxHeight} !important` : "100%" };
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