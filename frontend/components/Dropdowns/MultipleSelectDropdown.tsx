import { PlusOutlined, TagOutlined } from '@ant-design/icons'
import { Button, Checkbox, Dropdown } from 'antd'
import React, { useState } from 'react'

function MultipleSelectDropdown({tags, get_active}:{tags: string[], get_active: (vals: string[])=>void}) {
    const [visible, set_visible] = useState<boolean>(false)

    const DropdownMenu = ( ) =>(
        <div  style={{boxShadow: "0 5px 11px rgb(13 61 98 / 19%)"}} className="flex p-2 pt-4 rounded-md flex-col items-start bg-white justify-start">
            <Checkbox.Group className="!flex !flex-col items-start !justify-start" onChange={(values)=>{
                get_active(values as string[])
            }} >
                    <Checkbox className="invisible" ></Checkbox>
                    {tags.map((tag)=>(
                        <Checkbox value={tag} className="capitalize" >
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