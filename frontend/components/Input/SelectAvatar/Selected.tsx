import { CheckOutlined } from '@ant-design/icons'
import React from 'react'
import styled from 'styled-components'
import GeneralAvatar from '../../OneJob/GeneralAvatar'

function SelectedAvatar({active_schmoe, set_active, schmoe}: {active_schmoe: string, set_active: (val: string)=>void, schmoe: string}) {
  return (
    <CustomAvatar onClick={()=>{
        set_active(schmoe)
    }} className="flex cursor-pointer flex-row relative rounded-full h-[40px] bg-blue-900 w-[40px] overflow-hidden " >
        <GeneralAvatar user_name={schmoe} avatar={`https://joeschmoe.io/api/v1/${schmoe}` }/>
        {active_schmoe == schmoe &&  <CheckOutlined className="text-white font-bold text-lg absolute top-[5px] left-[15px] "  />}
    </CustomAvatar>
  )
}

export default SelectedAvatar

const CustomAvatar = styled.div``