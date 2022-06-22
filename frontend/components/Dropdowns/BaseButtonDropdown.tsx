import { BugOutlined, BulbOutlined, QuestionOutlined, SearchOutlined, StarOutlined, ToolOutlined } from '@ant-design/icons'
import { Button, Checkbox, Divider, Dropdown, Radio } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import React, { ReactNode, useState } from 'react'
import { Text } from '../../pages/_app'

function BaseButtonDropdown({default_val, options, get_current_val, title, onClick, onChange}: {onClick: ()=>void ,default_val: {
    name: string,
    current_icon: ReactNode
    }; options: {name: string, icon: ReactNode}[] ; get_current_val: (val: string)=>void; title: string; 
    onChange?: (val: any)=>void
    }) {
    const [menu_open, set_menu_open] = useState<boolean>(false)
    const [{current_icon, name}, set_current_item] = useState(default_val)

    const DropdownMenu = () => (
        <div style={{boxShadow: "0 5px 11px rgb(13 61 98 / 19%)"}} className="flex p-2 pt-4 rounded-md flex-col items-start bg-white justify-start">
            <div className="flex flex-row capitalize w-full items-center justify-center p-2">
                {title}
            </div>
            <Divider className='!p-0 !m-0 ' />
            <Radio.Group  onChange={(e)=>{
                    if(typeof onChange !== "undefined"){
                            set_current_item({
                                name: e.target.value,
                                current_icon: <></>
                            })
                            get_current_val(e.target.value)
                    }else{
                        var n = e.target.value
                        console.log(n)
                        set_current_item({
                            name: n,
                            current_icon: n == "bug" ? <BugOutlined/> : n == "observation" ? <SearchOutlined/> : n == "question" ? <QuestionOutlined/> : n == "suggestion" ? <BulbOutlined/> : n == "improvement" ?  <ToolOutlined/> : <StarOutlined/>
                        })
                        get_current_val(n)
                    }
                   
            }} defaultValue={[name.toLocaleLowerCase()]}  className="w-full !flex !flex-col items-center justify-start" >
                <Radio className='invisible' ></Radio>
                {
                    
                   options.map(({name, icon})=>(
                        <Radio className=" justify-start" value={name.toLocaleLowerCase()} >
                            <div className="flex flex-row items-center justify-between w-[140px]">
                                <Text className='ml-2 capitalize ' >
                                    {name}
                                </Text>
                                {icon}
                            </div>
                        </Radio>
                    ))
                }

            </Radio.Group>
            
        </div>
    )

  return (
    <Dropdown overlay={DropdownMenu}  >
        <Button className="!rounded-md flex flex-row w-full items-center capitalize justify-between" icon={current_icon} >
            {name}
        </Button>
    </Dropdown>
  )
}

export default BaseButtonDropdown