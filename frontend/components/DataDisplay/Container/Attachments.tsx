import { Divider, Image } from 'antd'
import { isUndefined } from 'lodash'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { backend_url } from '../../../globals'
import useIssue from '../../../hooks/useIssue'
import EmptyAndLoading from '../../Containers/EmptyAndLoading'
import ImageWithPreview from '../../images/ImageWithPreview'
import DocAttachment from './DocAttachment'

function Attachments() {
    const {attachments} = useIssue()

    useEffect(()=>{

    }, [,attachments])
    
  return (
    <div className="flex flex-col items-start justify-start w-full">
        <EmptyAndLoading empty_description='No Images' className="flex flex-row items-start flex-wrap !justify-start w-full min-h-[200px]">
                    {
                        attachments?.filter(({file_type, attachment_key})=>file_type.includes("image") && !isUndefined(attachment_key) ).map(({file_type, attachment_key, attachment_name})=>(
                            
                                        <ImageWithPreview key={attachment_key} _key={attachment_key} image={`${backend_url}/asset/${attachment_key}`} />
                                   
                            
                        ))
                    }
        </EmptyAndLoading>
        <Divider/>
        <EmptyAndLoading empty_description='No Documents' className="flex flex-row  items-start flex-wrap justify-start w-full min-h-[200px]">
                    {
                        attachments?.filter(({file_type})=>!file_type.includes("image")).map(({file_type, attachment_key, attachment_name})=>(
                            
                                        <DocAttachment key={attachment_key} _key={attachment_key} name={attachment_name} />
                                    
                             
                        ))
                    }
        </EmptyAndLoading>
    </div>
    
  )
}

export default Attachments

const Container = styled(EmptyAndLoading)`
    .ant-image-preview-img-wrapper {
        background: pink !important;
    }
`