import { PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React from 'react'
import PageBaseContainer from '../../../../components/Containers/PageBaseContainer'
import TeamCard from '../../../../components/DataDisplay/Cards/TeamCard'

function Teams() {
  return (
    <PageBaseContainer>
      <div className="flex flex-row w-full mt-5 items-center justify-between">
        <Input.Search placeholder='Search Teams' className="w-1/4"  />
        <Button className=" !text-black !flex items-center justify-center " icon={<PlusOutlined/>} >
          Add Team
        </Button>
      </div>
      <div className="flex flex-row pt-4 items-start justify-start w-full h-full flex-wrap space-y-2">
        <TeamCard/>
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