import { Button, Typography } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import LeftModalContainer from '../../Containers/LeftModal'

const {Text} = Typography

function BugComment() {
    const [visible, set_visible] = useState<boolean>(false)

    const hide = () =>{
        set_visible(false)
    }
    const show = () =>{
        set_visible(true)
    }

  return (
    <>
    <LeftModalContainer hide={hide} isVisible={visible} >

    </LeftModalContainer>
    <BugCommentContainer className="w-full overflow-hidden bg-[#f5f5f5] relative flex flex-col items-center justify-start p-2" >
        <Text className="text-sm  text-left" >
            <Text className="capitalize !text-black ml-[-2px]  text-left " >
                Oliver
            </Text>
            <Text className="ml-1" >
                Commented 11 hours ago
            </Text>
        </Text>
        <Text className="text-sm pt-1 w-full text-left !text-black" >
            To intergrate with slack
        </Text>
        <div className="flex flex-row items-center w-full min-h-[100px] overflow-hidden "></div>
        <div className="absolute bottom-0 w-full flex flex-col read-more items-center justify-end pb-5"   >
            <Button onClick={show} type='primary' className="!bg-blue-700" >
                <Text className="!text-white text-medium" >Read More</Text>
            </Button>
        </div>
    </BugCommentContainer>
    </>
  )
}

export default BugComment

const BugCommentContainer = styled.div`
    border: 1px solid #DCE5EE;
    border-radius: 5px;
    .read-more{
        background-image: linear-gradient(to bottom,transparent 32%,#ffffff 80%);
    }
`