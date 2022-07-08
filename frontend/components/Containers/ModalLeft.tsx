import { BugOutlined } from '@ant-design/icons'
import { Button, Dropdown, Input, notification, Radio, Select } from 'antd'
import axios from 'axios'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { backend_url, general_statuses, IssueTypes, severity_levels } from '../../globals'
import { is_def_string } from '../../helpers'
import useIssue from '../../hooks/useIssue'
import { tick_up_issue } from '../../jotai/state'
import { Text } from '../../pages/_app'
import UploadAction from '../Actions/UploadAction'
import BaseButtonDropdown from '../Dropdowns/BaseButtonDropdown'

function ModalLeft() {
    const {type, status, severity, loading, is_error, _id, system_details} = useIssue()
    const [i_type, set_type] = useState<string>("")
    const [i_status, set_status] = useState<string>("")
    const [i_severity, set_severity] = useState<string>("")
    const [details, set_details] = useState<string>("")
    const [attachments, set_attachments] = useState([])
    const [, up] = useAtom(tick_up_issue)

    useEffect(()=>{
        set_details(system_details)
    }, [, loading, is_error ])

    const submit=(vals: any)=>{
        console.log(Object.fromEntries([vals]))
        axios.put(`${backend_url}/issue/${_id}`, Object.fromEntries([vals]), {
            withCredentials: true
        }).then(()=>{
            notification.success({
                message: "Success",
                key: `issue_success`
            })
        }).catch((e)=>{
            console.log(e)
            notification.error({
                message: "An error occured",
                key: "issue_error"
            })
        })
    }

    const submit_details = () =>{
        axios.put(`${backend_url}/issue/${_id}`, {
            system_details: details
        }, {
            withCredentials: true
        }).then(()=>{
            notification.success({
                message: "Success",
                key: `issue_success`
            })
        }).catch((e)=>{
            console.log(e)
            notification.error({
                message: "An error occured",
                key: "issue_error"
            })
        })
    }

  return (
    <div className="flex flex-col mt-5 w-full h-full items-start !space-y-2 justify-start">
        <Dropdown className='w-[150px]' arrow overlay={
            <Radio.Group defaultValue={type}   onChange={(e)=>{
                set_type(e.target.value)
                submit(["type", e.target.value])
            }} className='!flex shadow-lg bg-white !p-5 !flex-col !items-start !justify-start' >
                {
                    IssueTypes.map(({name})=>(
                        <Radio key={name} value={name.toLocaleLowerCase()} >
                            {name}
                        </Radio>
                    ))
                }
            </Radio.Group>
        } >
            <Button className="flex capitalize flex-row w-full items-center justify-start" >
                <Text>
                    { i_type?.length == 0 ? type : i_type }
                </Text>
            </Button>
        </Dropdown>

        <Dropdown className='w-[150px]' arrow overlay={
            <Radio.Group defaultValue={severity}  onChange={(e)=>{
                submit(["severity", e.target.value])
                set_severity(e.target.value)
            }}  className='!flex shadow-lg bg-white !p-5 !flex-col !items-start !justify-start' >
                {
                    severity_levels.map(({name})=>(
                        <Radio key={name} value={name.toLocaleLowerCase()} >
                             {name}
                        </Radio>
                    ))
                }
            </Radio.Group>
        } >
            <Button className="flex flex-row w-full items-center justify-start" >
                <Text className='capitalize' >
                    {
                        i_severity?.length == 0 ? severity : i_severity
                    }
                </Text>
            </Button>
        </Dropdown>

        <Dropdown className='w-[150px]' arrow overlay={
            <Radio.Group defaultValue={status}  onChange={(e)=>{
                submit(["status", e.target.value])
                set_status(e.target.value)
            }}  className='!flex shadow-lg bg-white !p-5 !flex-col !items-start !justify-start' >
                {
                    general_statuses.map(({name})=>(
                        <Radio key={name} value={name.toLocaleLowerCase()} >
                            {name}
                        </Radio>
                    ))
                }
            </Radio.Group>
        } >
            <Button className="flex flex-row w-full items-center justify-start" >
                <Text className='flex capitalize ' >
                    {
                        i_status?.length == 0 ? status : i_status
                    }
                </Text>
            </Button>
        </Dropdown>
                    
        <div className="flex flex-row items-center justify-start">
            <Input.Group compact >
            <Input className="!w-[63%]" placeholder='System details' value={details} defaultValue={system_details} onPressEnter={submit_details}  onChange={(e)=>{
             
                set_details(e.target.value)
            }} />
            <Button onClick={submit_details} >
                Save
            </Button>
            </Input.Group>
        </div>
        <div className="flex flex-col items-start justify-start w-full mt-3">
            <UploadAction onChange={(vals)=>{
                
                var n = vals.length -1
                if(vals.length > 0 && (attachments.length < vals.length || attachments.length == 0) ){
                    axios.put(`${backend_url}/assets/${_id}`, {
                        attachment: vals[n]
                    },
                    {
                        withCredentials: true
                    }).then(()=>{
                        set_attachments(vals)
                        notification.info({
                            message: "Attachment added to issue successfully",
                            key: "added_attachment_to_issue"
                        })
                        up()
                    }).catch((e)=>{
                        notification.info({
                            message: "Unable to add attachment to issue",
                            key: "Unable to add attachment to issue"
                        })
                    })
                }
            }} />
        </div>
    </div>
  )
}

export default ModalLeft