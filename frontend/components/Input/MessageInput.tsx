import { Button, Form, FormInstance, Input, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import axios from 'axios'
import dynamic from 'next/dynamic'
import React from 'react'
const Quill = dynamic(()=>import("react-quill"), {
    ssr: false
})
import "react-quill/dist/quill.snow.css"
import { backend_url } from '../../globals'

function MessageInput({on_submit}:{on_submit: ()=>void}) {
    const [form] = useForm()
    const submit = () =>{
        form.validateFields().then((vals)=>{


            axios.post(`${backend_url}/inbox`,  {
                to: vals.to,
                type: "message",
                subject: vals.subject,
                msg_content: vals.message
              }, {
                withCredentials: true
              }).then(()=>{
                on_submit()
                notification.success({
                  message: "Success",
                  key: "inbox_success"
                })
              }).catch((e)=>{
                console.log(e)
                notification.error({
                  message: "An Error Occured",
                  key: "inbox_error"
                })
              })


        }).catch((e)=>{

        })
    }
  return (
    <Form layout='vertical' form={form} >
        <Form.Item rules={[
            {
                required: true,
                message: "This value is required"
            }
        ]} label="To" name="to" >
            <Input placeholder="Email or username of the receiver" />
        </Form.Item>
        <Form.Item rules={[
            {
                required: true,
                message: "This value is required"
            }
        ]} label="Subject" name="subject" >
            <Input placeholder="Enter the subject of this message" />
        </Form.Item>
        <Form.Item rules={[
            {
                required: true,
                message: "This value is required"
            }
        ]} initialValue={""} name="message" label="Message" >
            <Quill preserveWhitespace={true} theme="snow" defaultValue={""}  />
        </Form.Item>
        <Form.Item>
            <Button onClick={submit} htmlType='submit' >
                Submit
            </Button>
        </Form.Item>
    </Form>
  )
}

export default MessageInput