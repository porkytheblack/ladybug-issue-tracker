import { Button, Col, Form, Input, Row, Typography } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'

const {Text, Link} = Typography

function Reset() {
    const [processing_state, set_processing_state] = useState<"none"| "success" | "loading" | "error">("none")
    const router = useRouter()
    const to_login = () =>{
        router.push("/auth")
    }
  return (
    <ResetContainer className="w-screen h-screen overflow-hidden bg-[#4e73df] flex flex-col items-center justify-center " >
        <Row className="!w-4/5 !h-[400px] bg-white" >
            <Col span={12} className="!h-full !flex !flex-col !items-center !justify-center" >
                <Image src={`/illustrations/${processing_state == "none" ? "reset_password" : processing_state == "error" ? "server_error" : processing_state == "loading" ? "loading" : "success"}.svg`} width="300px" height="400px" />
            </Col>
            <Col span={12} className="!h-full bg-yellow-50 !flex !flex-col !items-center !justify-around " >
                    <Text className="text-lg text-[#3a3b45]" >
                        Reset Password
                    </Text>
                    <Form name="reset_password_form" layout='vertical' className="!mt-[12px] !w-4/5 !p-[20px] " >
                        <Form.Item name="new_password"  >
                            <CustomInput type="password" placeholder='New password' />
                        </Form.Item>
                        <Form.Item name="confirm" >
                            <CustomInput type="password" placeholder='Confirm New password' />
                        </Form.Item>
                        <Form.Item name="confirm" >
                            <Button>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="w-[74%] h-[0.3px] opacity-[0.4] bg-[#3a3b45] " ></div>
                    <Link onClick={to_login} >
                        Back to login
                    </Link>
            </Col>
        </Row>
    </ResetContainer>
  )
}

export default Reset

const ResetContainer = styled.div``

const CustomInput = styled(Input)`

`
