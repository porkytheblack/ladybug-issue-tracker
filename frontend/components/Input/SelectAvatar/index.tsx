import { Col, notification, Row } from 'antd'
import axios from 'axios'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { backend_url, the_schmoes } from '../../../globals'
import { userAtom } from '../../../jotai/state'
import SelectedAvatar from './Selected'

function SelectAvatar() {
    const [active_schmoe, set_active_schmoe] = useState<string>("")
    const [user,  set_user] = useAtom(userAtom)
    const set_schmoe = (val: string) =>{
        set_active_schmoe(val)
    }

    useEffect(()=>{
        if(active_schmoe.length == 0 ) return ()=>{}
        axios.put(`${backend_url}/user`, {
            avatar: `https://joeschmoe.io/api/v1/${active_schmoe}`
        }, {
            withCredentials: true
        }).then(()=>{
            var s = user
            if(s !== null)
            s.avatar = `https://joeschmoe.io/api/v1/${active_schmoe}`
            set_user((user)=>s)
        }).catch((e)=>{
            console.log(e)
            notification.error({
                message: "An error occured",
                key: "avatar change error"
            })
        })
    }, [active_schmoe])
  return (
    <Row align='top' justify='space-between' className="w-3/4" gutter={[8,8]}  >
        {
            the_schmoes.map((schmoe)=>(
                <Col span={3} >
                    <SelectedAvatar schmoe={schmoe} set_active={set_schmoe} active_schmoe={active_schmoe} />
                </Col>
            ))
        }
        
    </Row>
  )
}

export default SelectAvatar