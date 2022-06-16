import { Typography } from 'antd'
import Image from 'next/image'
import React from 'react'

const {Text} = Typography

function ProjectCard({project_name, project_type}:{project_name: string, project_type: "site" | "server" | "database" | "app" }) {
  return (
    <div className="flex flex-col items-center justify-center p-5 rounded-[8px] border-[0.7px] border-[#eaeaea] "  >
        <Image src={`/icons/${project_type}.svg`} width="110px" height="100px" className="mb-3" />
        <Text className="text-md font-medium text-center w-full" >
            {project_name}
        </Text>
    </div>
  )
}

export default ProjectCard