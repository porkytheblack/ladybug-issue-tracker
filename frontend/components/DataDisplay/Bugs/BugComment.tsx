import { Button, Typography } from 'antd'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import styled from 'styled-components'
import { extCommentInterface } from '../../../globaltypes'
import { is_def_string } from '../../../helpers'
import LeftModalContainer from '../../Containers/LeftModal'
const ReactQuill = dynamic(()=>import("react-quill"), {ssr: false})
import "react-quill/dist/quill.snow.css"
import "react-quill/dist/quill.bubble.css"
import { useAtom } from 'jotai'
import { activeIssueAtom, LeftModalVisibility } from '../../../jotai/state'

const {Text} = Typography

function BugComment({comment}: {comment: extCommentInterface}) {
    const [visible, set_visible] = useAtom(LeftModalVisibility)
    const [, set_issue] = useAtom(activeIssueAtom)

    const hide = () =>{
        set_visible(false)
    }
    const show = () =>{
        set_issue(is_def_string(comment?.issue_id))
        set_visible(true)
    }
    console.log(comment?.author?.user_name)
  return (
    <>
    <BugCommentContainer className="w-full h-[150px]  overflow-hidden bg-[#f5f5f5] relative flex flex-col items-center justify-start p-2" >
        <ReactQuill defaultValue={""} theme="bubble" className='w-full' value={typeof comment?.description == "undefined" ? "" :  comment?.description} />
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