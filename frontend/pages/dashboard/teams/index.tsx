import { PlusOutlined, UserAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Input, Modal } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import PageBaseContainer from '../../../components/Containers/PageBaseContainer'
import TeamCard from '../../../components/DataDisplay/Cards/TeamCard'

function Teams() {
  const [{
    visible,
    action
  }, set_modal_config ] = useState<{visible: boolean, action: "add"| "edit"}>({
    visible: false,
    action: "add"
  })
    const show_modal = () =>{
      set_modal_config(({visible, action})=>({visible: true, action}))
    }
    const hide_modal = () =>{
      set_modal_config(({visible, action})=>({visible: false, action}))
    }
    const change_action = (_action: "add" | "edit") =>{
      set_modal_config((_)=>({visible: true, action: _action}))
    }
    const edit_team = () =>{
      change_action("edit")
    }
  return (
    <PageBaseContainer>
      <Modal title={action == "add" ? "Create New Team" : "Edit team"}  footer={null} onCancel={hide_modal}  visible={visible}>
            {
              action == "add" && (
                <Form layout='vertical' className='w-full'  >
                  <Form.Item name="team_name" >
                      <Input type="string" className="w-full" placeholder='Team Name'  />
                  </Form.Item>  
                  <Form.Item>
                    <Avatar.Group>
                      <Avatar src="https://joeschmoe.io/api/v1/joe" />
                      <Avatar icon={<UserAddOutlined/>} className="!flex cursor-pointer flex-row items-center justify-center" />
                    </Avatar.Group>
                  </Form.Item>
                  <Form.Item>
                    <Button>
                      Save
                    </Button>
                  </Form.Item>
                </Form>
              )
            }
            {
              action == "edit" && (
                <div className="flex flex-col items-center w-full justify-start">
                  <Input placeholder="Team name" type="text" />

                  
                </div>  

              )
            }
      </Modal>
      <div className="flex flex-row w-full mt-5 items-center justify-between">
        <Input.Search placeholder='Search Teams' className="w-1/4"  />
        <Button onClick={(e)=>{
            change_action("add")
        }} className=" !text-black !flex items-center justify-center " icon={<PlusOutlined/>} >
          Add Team
        </Button>
      </div>
      <div className="flex flex-row pt-4 items-start justify-start w-full h-full flex-wrap space-y-2">
        <TeamCard onClickEdit={edit_team} />
        <TeamCard/>
        <TeamCard/>
        <TeamCard/>
        <TeamCard/>
        <TeamCard/>
      </div>
    </PageBaseContainer>
  )
}

export default Teams