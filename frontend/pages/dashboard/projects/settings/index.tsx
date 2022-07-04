import { Button, Form, Input, notification, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import PageBaseContainer from '../../../../components/Containers/PageBaseContainer'
import { backend_url } from '../../../../globals'
import { is_def_string } from '../../../../helpers'
import useProject from '../../../../hooks/useProject'
import useTeams from '../../../../hooks/useTeams'
import { userAtom } from '../../../../jotai/state'
import { Text } from '../../../_app'

function Settings() {
  const {teams} = useTeams()
  const {project, is_loading, is_error, name, project_team, platform, _id} = useProject()
  const [user, ] = useAtom(userAtom)
  const [init_val, set_init_val] = useState<{
    project_name: string,
    project_platform: string,
    project_team: string
  }>({
    project_name: "",
    project_platform: "",
    project_team: ""
  })
  const [form] = useForm()
  useEffect(()=>{
    if(is_loading && is_error) return ()=>{}
    set_init_val({
      project_name: is_def_string(project.project_name),
      project_platform: is_def_string(project.platform),
      project_team: is_def_string(project.team)
    })
  }, [project])
  const {push } = useRouter()
  const submit = () =>{
    form.validateFields().then((vals)=>{
      axios.put(`${backend_url}/project/${_id}`, {
        project_name: vals.name,
        team: vals.project_team,
        platform: vals.project_platform
      }, {withCredentials: true}).then(()=>{
          notification.success({
            message: "Success",
            key: "project_update_success"
          })
      }).catch((e)=>{
        notification.error({
          message: "An error occured",
          key: "update_project_error"
        })
      })
    })
  }

  const delete_project = ()=>{
    axios.delete(`${backend_url}/project/${_id}`,{
      withCredentials: true
    }).then(()=>{
      push("/dashboard/projects").then(()=>{
        notification.success({
          message: "Deleted Successfully",
          key: "project_deleted_successfully"
        })
      }).catch((e)=>{
        console.log(e)
      })  
    }).catch((e)=>{
      notification.error({
        message: "An error occured",
        key: "delete_project_error"
      })
    })
  }


  
  return (
    <PageBaseContainer>
      <div className="flex bg-white rounded-[10px] p-[20px] flex-col w-full items-start justify-start">
        <Text className="!text-black text-xl font-medium mb-6  " >
          Update project details
        </Text>
        <Form onFinish={submit} fields={[
          {
            name: "project_name",
            value: 
              init_val.project_name
            ,
            
          },
          {
            name: "project_platform",
            value: 
              init_val.project_platform
            
          },
          {
            name: "project_team",
            value: 
              init_val.project_team
            
          }
        ]} form={form} name="update_project_details" layout='vertical'  >
          <Form.Item   name="project_name" label="Project Name" labelAlign='left' >
              <Input disabled={user?.user_name !== project.project_creator} type="text" placeholder='Project Name' />
          </Form.Item>
          <Form.Item   name="project_platform" label="Project Platform" labelAlign='left' >
              <Select disabled={user?.user_name !== project.project_creator}   >
                <Select.Option key="android" >
                  Android
    
                </Select.Option>
                <Select.Option key="ios" >
                  IOS
                </Select.Option>
                <Select.Option key="desktop" >
                  Desktop
                </Select.Option>
                <Select.Option key="web" >
                  Web
                </Select.Option>
              </Select>
          </Form.Item>
          <Form.Item  name="project_team" label="Project Team" labelAlign='left' >
              <Select disabled={user?.user_name !== project.project_creator}  >
                { 
                  teams.map(({team_name})=>(
                    <Select.Option key={team_name} value={team_name} >
                      <Text>
                        {team_name}
                      </Text>
                    </Select.Option>
                  ))
                }
              </Select>
          </Form.Item>
          <Form.Item>
            <Form.Item noStyle >
              <Button disabled={user?.user_name !== project.project_creator}  htmlType='submit' >
                Save
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
        <div className="flex flex-row w-full items-center jusitfy-center">
          <Button onClick={delete_project} disabled={user?.user_name !== project.project_creator} type='primary' danger >
            Delete
          </Button>
        </div>
      </div>
    </PageBaseContainer>
  )
}

export default Settings   