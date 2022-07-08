import { PlusOutlined, TagOutlined } from '@ant-design/icons'
import { Button, Checkbox, Dropdown } from 'antd'
import { useAtom } from 'jotai'
import { isUndefined } from 'lodash'
import React, { useEffect, useState } from 'react'
import { activeIssueAtom } from '../../jotai/state'

function MultipleSelectDropdown({tags, get_active, default_vals}:{tags: string[], get_active: (vals: string[])=>void , default_vals?: string[]}) {
    const [visible, set_visible] = useState<boolean>(false)
    const [current_issue, ] = useAtom(activeIssueAtom)
    const [def_vals, set_def_vals] = useState<string[]>([])

    useEffect(()=>{
        console.log(default_vals)
        if(isUndefined(default_vals)) return ()=>{}
        set_def_vals(default_vals)
        return ()=>{
            set_def_vals([])
        }
    }, [, current_issue])

    const DropdownMenu = ( ) =>(
        <div  style={{boxShadow: "0 5px 11px rgb(13 61 98 / 19%)"}} className="flex p-2 pt-4 rounded-md flex-col items-start bg-white justify-start">
            <Checkbox.Group defaultValue={def_vals}  className="!flex !flex-col items-start !justify-start" onChange={(values)=>{
                get_active(values as string[])
            }} >
                    <Checkbox className="invisible" ></Checkbox>
                    {tags.map((tag)=>(
                        <Checkbox key={tag} value={tag} className="capitalize" >
                            {tag}
                        </Checkbox>
                    ))}
            </Checkbox.Group>
        </div>  
    )
    
    const handleVisibleChange = (flag: boolean) =>{
            set_visible(flag)
    }

  return (
    <Dropdown overlay={DropdownMenu} onVisibleChange={handleVisibleChange} visible={visible} >
        <Button icon={<TagOutlined/>} className="rounded-m flex flex-row items-center justify-between !text-black " >
            Add Tag
        </Button>
    </Dropdown>
  )
}

export default MultipleSelectDropdown