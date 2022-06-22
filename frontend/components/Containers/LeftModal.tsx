import { CloseOutlined } from '@ant-design/icons'
import { Divider, Select, Tag } from 'antd'
import React, { ReactNode, useEffect, useRef } from 'react'
import { Text } from '../../pages/_app'
import StatusTag from '../Tags/StatusTag'
import BaseModalContainer from './BaseModalContainer'

function LeftModalContainer({children, isVisible, hide}: {children: ReactNode | ReactNode[], isVisible: boolean, hide: ()=>void}) {
    
    useEffect(()=>{
        const target = document.querySelector("#leftmodal")
        if(target !== null){
            const base = document.querySelector("#basemodal_mask")
            if(base){
                base.addEventListener("click", (e)=>{
                    if(!e.composedPath().includes(target)){
                        if(isVisible){
                            hide()
                        }
                    }
                })
            }
        }
       
    }, [])
  return (
    <BaseModalContainer  hide={hide} className='flex-row items-start justify-end' isVisible={isVisible} >
        <div id="leftmodal" className="flex flex-col items-center relative justify-start  !bg-[#F2F5FA]   w-[70%] h-full ">
            <div  className="flex flex-row items-center   justify-between w-full bg-[#F3F3F3] p-[10px_20px]  border-[1px] border-solid border-[#D3D3D3]  ">
                <a onClick={hide} className="flex absolute top-2 right-2 flex-row items-center justify-center">
                    <CloseOutlined/>
                </a>
                <div className="flex flex-col w-1/2 h-full items-start justify-start">
                    <div className="flex flex-row items-center mb-3 justify-start">

                        <Tag className="!bg-blue-800 mr-2 "  color="blue" >
                            <Text className="!text-white uppercase " >
                                    Bug1
                            </Text>
                        </Tag>
                        <StatusTag>
                            New
                        </StatusTag>


                    </div>

                    <div className="flex flex-row items-center justify-start">
                        <Text className="text-xl !font-medium !text-black "  >
                                Working on Modal!
                        </Text>
                    </div>
                    <div className="flex flex-row items-center justify-start mb-2">
                        <Text className="mr-2" >
                            Project Type
                        </Text>
                        <Select defaultValue={["bug"]} >
                            <Select.Option key="bug" >
                                Bug
                            </Select.Option>
                            <Select.Option key="observation" >
                                Observation
                            </Select.Option>
                            <Select.Option key="feature" >
                                Feature
                            </Select.Option>

                        </Select>
                    </div>

                </div>

                <div className="flex flex-col items-end justify-start w-1/2 " >
                    <Text>
                        By  porkytheblack
                        <Divider className='bg-black' type="vertical" />
                        <Text>
                            On Monday 20th June
                        </Text>
                    </Text>
                </div>
            </div>  
        {children}
        </div>
    </BaseModalContainer>
  )
}

export default LeftModalContainer