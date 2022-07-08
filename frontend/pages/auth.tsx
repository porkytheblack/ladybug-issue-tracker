import { useAuth0 } from '@auth0/auth0-react'
import { Button, Col, Divider, Form, Input, notification, Row, Typography } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import axios from 'axios'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { backend_url } from '../globals'
import userAuth from '../hooks/userAuth'
import { refreshToken, userAtom, userAuthTypeAtom } from '../jotai/state'

const {Text, Title, Link} = Typography

function Auth() {
    //oauth
    const {loginWithPopup, user} = useAuth0()
    const [auth_form] = useForm()
    const [user_atom, set_user_atom] = useAtom(userAtom)
    const [, set_auth_type] = useAtom(userAuthTypeAtom)
    const {push} = useRouter()
    const [loading, set_loading] = useState<boolean>(false)
    const [, set_refresh_token] = useAtom(refreshToken)
    const {up} = userAuth()

   
    const [auth_state, set_auth_state] = useState<"login"| "signup" | "forgot" >("login")
    const [processing, set_processing] = useState<"loading" | "error" | "invalid" | "none">("none")
    const change_auth_state =()=> {
        if(auth_state == "login"){
            set_auth_state("signup")
        }else{
            set_auth_state("login")
        }
    }
    const toggle_forgot = () =>{
        if(auth_state == "forgot"){
            set_auth_state("login")
        }else{
            set_auth_state("forgot")
        }
    }
    const SubmitForm = () =>{
        set_loading(true)
        auth_form.validateFields().then((values)=>{
            if(auth_state == "signup"){
                axios.post(`${backend_url}/user`, values).then((_res)=>{
                    set_auth_state("login")
                    notification.success({
                        message: "Success",
                        key: "signup_success"
                    })
                    set_loading(false)
                }).catch((e)=>{
                    notification.error({
                        message: "An error occured",
                        key: "auth_error"
                    })
                    set_loading(false)
                })
            }
            if(auth_state == "login"){
                axios.post(`${backend_url}/login`, {...values, authType: "normal"}, {
                    withCredentials: true
                }).then((_res)=>{
                    const {user_name, email, authType, avatar, token} = _res.data 
                    set_user_atom({
                        user_email: email,
                        user_name,
                        first_name: "",
                        last_name: "",
                        avatar
                    })

                    set_auth_type(authType)
                    set_refresh_token(token)
                    notification.success({
                        message: "Success",
                        key: "auth_success"
                    })
                    push("/dashboard").then(()=>{
                        up()
                    })
                    set_loading(false)
                }).catch((e)=>{
                    notification.error({
                        message: "An error occured",
                        key: "auth_error"
                    })
                    set_loading(false)
                })
            }
            
        }).catch((e)=>{
        })
    }

    useEffect(()=>{
        if( typeof user !== "undefined" &&  user !== null){
            if(user_atom == null){
                if(auth_state == "signup"){
                    axios.post(`${backend_url}/user/auth0`, {
                        user_sub: user.sub
                    }, {
                        withCredentials: true
                    }).then((res)=>{
                        set_auth_state("login")
                        notification.success({
                            message: "User signed up successfully",
                            key: "sign_up_success"
                        })
                       
                        set_loading(false)
                    }).catch((e)=>{
                        notification.error({
                            message: "An error occured",
                            key: "signup_error"
                        })
                        set_loading(false)
                    })
                    
                }
                if(auth_state == "login"){
                    axios.post(`${backend_url}/login`, {
                        authType: "auth0",
                        sub: user?.sub,
                    }, {
                        withCredentials: true
                    }).then(({data})=>{
                        const {user_name, email, avatar, token} = data
                        set_user_atom({
                            user_name,
                            user_email: email,
                            avatar,
                            first_name: "",
                            last_name: ""
                        })
                        set_auth_type("auth0")
                        set_refresh_token(token)
                        notification.success({
                            message: "Login Success",
                            key: "login_success"
                        })
                        push("/dashboard").then(()=>{
                            up()
                        })
                        set_loading(false)
                    }).catch((e)=>{
                        console.log(e)
                        notification.error({
                            message: "Login Error",
                            key: "login_error"
                        })
                        set_loading(false)
                    })
                }

            }
        }
    }, [user])

  return (
    <AuthContainer className="flex flex-col  items-center justify-center h-screen overflow-hidden w-screen  bg-[#4e73df]" >
            <div  className="w-4/5 flex flex-row items-center justify-between !h-[500px] bg-white card  " >
                <div  className=" hidden md:!flex w-1/2 !flex-col !items-center !justify-center h-full  "  >
                        <Image width="300px" height="400px" src={`/illustrations/${processing == "none" ? (auth_state == "login" ? "login" : auth_state == "forgot" ? "forgot_password" : "join"): processing == "loading" ? "loading" : processing == "error" ? "server_error" : "access_denied"}.svg`} />
                </div>
                <div className="!flex !flex-col w-full md:w-1/2 bg-yellow-50 !items-center !justify-center !h-full"  >
                    <Text className="text-lg text-[#3a3b45] "  >
                       { processing == "none" ? (auth_state == "login" ?  "Welcome Back!" : auth_state == "forgot" ? "Forgot password?" :  "Hey 👋") : processing == "error" ? "An Error Occured" : processing == "invalid" ? "Invalid Credentials Added" : processing == "loading" ? "Working On it" : "" }
                    </Text>
                    <Form  form={auth_form} name="auth_form" layout='vertical' className="!mt-[12px] !w-4/5 !p-[20px] " >
                        { (auth_state == "signup" || auth_state =="login") && <Form.Item rules={[{required: true, message: "User name is Required"}]}  name="user_name" className="!w-full !flex !flex-row"  >
                                <CustomInput type="text"   placeholder="User name" />
                        </Form.Item>}
                        {auth_state =="signup" && <Form.Item  name="email" rules={[{required: true, message: "Email is Required"}]} className="!w-full"  >
                                <CustomInput type="email"   placeholder="Email Address" />
                        </Form.Item>}
                        {auth_state !== "forgot" &&<Form.Item rules={[{required: true, message: "Password is Required"}]} name="password"   >
                                <CustomInput type="password"  placeholder="Password" />
                        </Form.Item  >}
                        { auth_state == "signup" && <Form.Item rules={[({getFieldValue})=>({
                                validator: (_, value) => {
                                    if(!value || getFieldValue("password") === value ){
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error("This value should match your password"))
                                }
                        })]} name="re_password"   >
                                <CustomInput type="password"  placeholder="Re-enter password" />
                        </Form.Item>}
                        <Form.Item>
                            <Button loading={loading} onClick={SubmitForm} htmlType='submit' >
                                {auth_state == "signup" ? "Sign Up" : auth_state == "forgot" ? "submit" : "Login"}
                            </Button>
                        </Form.Item>
                    </Form>
                    {auth_state !== "forgot" && <div className="w-[74%] h-[0.3px] opacity-[0.4] bg-[#3a3b45] " ></div>}
                    {auth_state !== "forgot" && <Row align="middle" justify='space-around' className="!w-[74%] pt-[10px] pb-[10px]" >
                        <Col span={4} >
                            <Button  onClick={loginWithPopup} className=" !border-none " icon={
                                <Image src="/icons/google.svg" height="36px" width="36px" />
                            } >
                            
                            </Button>
                        </Col>
                    </Row>}
                    <div className="w-[74%] h-[0.3px] opacity-[0.4] bg-[#3a3b45] " ></div>
                    <div  className="flex flex-col items-center justify-start" >
                            
                            {auth_state !== "forgot" && <Link onClick={change_auth_state} >
                                { auth_state == "signup" ? "Already have an account? Login" : "Don't have an account? Create One"}
                            </Link>}
                    </div>
                </div>
            </div>
    </AuthContainer>
  )
}

export default Auth

const AuthContainer = styled.div`
    background-image: linear-gradient(180deg,#4e73df 10%,#224abe 100%);
    background-size: cover;
    .card {
        border-radius: 5.6px;
        box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
        overflow: hidden;
    }
    .ant-form-item{
        margin-bottom: 5px !important;
    }
`

const CustomInput = styled(Input)`

`