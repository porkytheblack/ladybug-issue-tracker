import { BugOutlined, BulbOutlined, CloseOutlined, QuestionOutlined, SearchOutlined, SelectOutlined, StarOutlined, ToolOutlined } from '@ant-design/icons'
import { Divider, notification, Tag } from 'antd'
import axios from 'axios'
import { useAtom } from 'jotai'
import { isUndefined } from 'lodash'
import Image from 'next/image'
import React, { ReactNode, useEffect, useState } from 'react'
import { backend_url, IssueTypes } from '../../globals'
import { is_def_string } from '../../helpers'
import useIssue from '../../hooks/useIssue'
import { activeIssueAtom, LeftModalVisibility, tick_up_issue } from '../../jotai/state'
import { Text } from '../../pages/_app'
import BaseButtonDropdown from '../Dropdowns/BaseButtonDropdown'
import SummaryInput from '../Input/SummaryInput'
import StatusTag from '../Tags/StatusTag'

function LeftModalTopBar() {
    const [, set_visible] = useAtom(LeftModalVisibility)
    const [issue_type, set_issue_type] = useState<string>(IssueTypes[0].name.toLocaleLowerCase())
    const [current_issue, ] = useAtom(activeIssueAtom)
    const {creator, summary, status, type, _id} = useIssue()
    const [, up] = useAtom(tick_up_issue)
    const change_option = (val: string) =>{
        if(type !== val) {
            axios.put(`${backend_url}/issue/${_id}`, {
                type: val
            }, {
                withCredentials: true
            }).then(()=>{
                up()
                notification.success({
                    message: "Success",
                    key: "update_success"
                })
            }).catch((e)=>{
                notification.error({
                    message: "An error occured",
                    key: "update_error"
                })
            })
        }   
        
    }   

    useEffect(() => {
      return () => {
        
      }
    }, [,current_issue])
    

  return (
    <div  className="flex flex-row items-center   justify-between w-full bg-[#F3F3F3] p-[10px_20px]  border-[1px] border-solid border-[#D3D3D3]  ">
                <a onClick={()=>set_visible(false)} className="flex absolute top-2 right-2 flex-row items-center justify-center">
                    <CloseOutlined/>
                </a>
                <div className="flex flex-col w-1/2 h-full items-start justify-start">
                    <div className="flex flex-row items-center mb-3 justify-start">

                        <Tag className="!bg-blue-800 mr-2 "  color="blue" >
                            <Text className="!text-white uppercase " >
                                    Issue
                            </Text>
                        </Tag>
                        <StatusTag>
                            {status}
                        </StatusTag>


                    </div>
                    <SummaryInput/>
                    

                </div>

                <div className="flex flex-col items-end justify-start w-1/2 " >
                    <div className="flex flex-row items-center justify-start">
                        {!isUndefined(creator?.avatar)   && <div className="flex flex-row rounded-full h-10 w-10 overflow-hidden ">
                            <Image src={typeof creator?.avatar == "undefined" || creator?.avatar.length == 0 ? `https://joeschmoe.io/api/v1/${creator?.user_name}` : creator?.avatar } height={40} width={40} />
                        </div>}
                        <Text className="ml-5" >
                            By  @{creator?.user_name}
                            
                        </Text>
                    </div>
                   
                </div>
            </div>
  )
}

export default LeftModalTopBar