import { notification, Tag } from 'antd'
import axios from 'axios'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { backend_url, global_tags } from '../../globals'
import { generateRandomColor } from '../../helpers/randomColor'
import useIssue from '../../hooks/useIssue'
import { activeIssueAtom, tick_issue, tick_up_issue } from '../../jotai/state'
import { Text } from '../../pages/_app'
import MultipleSelectDropdown from '../Dropdowns/MultipleSelectDropdown'

function TagContainer({}: {}) {
    const [tick, ] = useAtom(tick_issue)
    const [current_issue, ] = useAtom(activeIssueAtom)
    const [, up] = useAtom(tick_up_issue)
    useEffect(()=>{

    }, [, tick, current_issue])

    const {_id, tags} = useIssue()

    const delete_tag = (tag_id: string)=>{
            axios.delete(`${backend_url}/tag/${_id}/${tag_id}`, {
                withCredentials: true
            }).then(()=>{
                up()
            }).catch((e)=>{
                notification.error({
                    message: "An error occured while deleting the tag",
                    key: "delete_tag_succes"
                })
            })
    }


    const change_tags = (vals: string[]) =>{
        var origi_tags = tags?.map(({tag_name}) => tag_name)
        var new_tags = vals.filter(tag=>!origi_tags?.includes(tag))
        var old_tags = vals.filter(tag=>origi_tags?.includes(tag))


        var new_tags = new_tags.concat(old_tags)
        if(new_tags.length > 0){
            axios.put(`${backend_url}/tags/${_id}`,{
                tags: vals.map((tag)=>({
                    tag_name: tag,
                    tag_color: generateRandomColor()
                }))
            },{
                withCredentials: true
            }).then(()=>{
                up()
                notification.success({
                    message: "Success",
                    key: "tag_success"
                })
            }).catch((e)=>{
                console.log(e)
                notification.error({
                    message: "An error occured",
                    key: "tag_update_error"
                })
            })
        }
    }


  return (
    <div className="flex flex-col items-stat justify-start w-1/2 ">
        <Text className="font-medium text-lg !text-black mb-2 " >
            Tags
        </Text>
        <div className="flex flex-row w-full items-center justify-start flex-wrap ">
            {
                tags?.map(({tag_name, tag_color, _id: tag_id})=>(
                    <Tag closable key={tag_id}  onClose={()=>{
                        delete_tag(tag_id)
                    }} className="!mr-1 !flex !flex-row !items-center !justify-between !mb-1" color={tag_color} >
                        {tag_name}
                    </Tag>
                ))
            }
        </div>
        <div className="flex flex-row mt-2">
            <MultipleSelectDropdown default_vals={tags?.map(({tag_name})=>tag_name)} get_active={change_tags} tags={global_tags} />
        </div>
    </div>
  )
}

export default TagContainer