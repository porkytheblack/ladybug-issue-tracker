import { CloseOutlined, UserAddOutlined } from '@ant-design/icons'
import { Avatar, Checkbox, Dropdown, Empty, notification, Tooltip } from 'antd'
import axios from 'axios'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { backend_url } from '../../globals'
import { is_def_string } from '../../helpers'
import useIssue from '../../hooks/useIssue'
import useTeam from '../../hooks/useTeam'
import { tick_up_issue } from '../../jotai/state'
import { Text } from '../../pages/_app'
import GeneralAvatar from '../OneJob/GeneralAvatar'

function AssigneesComponent() {

    const {creator, comments, severity, status, tags, description, summary, type, assignees, _id, loading, is_error} = useIssue()
    const {members} = useTeam()
    const [, up] = useAtom(tick_up_issue)


    useEffect(()=>{

    }, [,assignees])


    const add_assignee = (member_id: string) =>{
        axios.post(`${backend_url}/assignee/${_id}`, members.filter(({_id})=>_id == member_id)[0], {
            withCredentials: true
        }).then(()=>{
            up()
            notification.info({
                message: "Added new member to issue",
                key: "new_issue_member"
            })
        }).catch((e)=>{
            notification.error({
                message: "An error occured",
                key: "error"
            })
        })
    }

    const delete_assignee = (assignee_id: string) =>{
        axios.delete(`${backend_url}/assignee/${_id}/${assignee_id}`, {
            withCredentials: true
        }).then(()=>{
            notification.success({
                message: "Assignee removed"
            })
            up()
        }).catch((e)=>{
            notification.error({
                message: "Unable to delete member from issue",
                key: "unable to delete member"
            })
        })
    }

  return (
    <div className="flex flex-col w-1/2 h-full items-start justify-start">
    <Text className="font-medium text-lg !text-black mb-2 " >
        Assignees
    </Text>
    <Avatar.Group maxCount={5} >
        {
            assignees?.map(({avatar, user_name, _id: assignee_id})=>(
                <div key={assignee_id} className="flex flex-row group overflow-hidden items-center justify-center rounded-full relative">
                    <GeneralAvatar avatar={avatar} user_name={user_name}  />
                     {creator?.user_name !== user_name && <div className="flex-row cursor-pointer items-center hidden group-hover:flex justify-center w-full h-full absolute top-0 left-0 bg-[#00000060] ">
                        <Tooltip title={`Remove ${user_name}`} >
                        <CloseOutlined onClick={()=>{
                            delete_assignee(assignee_id)
                        }} className="text-white " /> 
                        </Tooltip>      
                    </div>} 
                </div>   
            ))
        }
        <Dropdown arrow overlay={<div className="p-5 bg-white shadow-xl " >
            {members?.filter(({user_name}) => !assignees?.map((val)=>val.user_name).includes(user_name as any)).length > 0 ? <Checkbox.Group

                onChange={(vals)=>{
                    var n = vals.length - 1
                    if(vals.length > 0){
                        add_assignee(vals[n] as string)
                    }
                    
                }}
            
            >
                {members.filter(({user_name})=>!assignees?.map(({user_name})=>user_name)?.includes(is_def_string(user_name))).map(({user_name, _id})=>(
                    
                    <Checkbox key={_id} value={_id} > 
                        {user_name}   
                    </Checkbox>   
                ))}
            </Checkbox.Group> : <Empty/> }
        </div>} >
            <Avatar className="!flex flex-row cursor-pointer !bg-yellow-600 items-center justify-center" size="large" icon={<UserAddOutlined/>} />
        </Dropdown>
    </Avatar.Group>
    
</div>
  )
}

export default AssigneesComponent