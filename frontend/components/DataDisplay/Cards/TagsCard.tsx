import { Empty, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { tagStat } from '../../../globaltypes'
import { generateRandomColor } from '../../../helpers/randomColor'
import useIssues from '../../../hooks/useIssues'
import { Text } from '../../../pages/_app'
import BaseDoughnutChart from '../../Charts/BaseDoughnutChart'
import BaseCard from '../../Containers/BaseCard'

const TagStats: tagStat[] = [
    {
        tag: "UX",
        count: 10,
        color: "#FD9A27"
    },
    {
        tag: "UI",
        count: 3,
        color: "#45D9D0"
    },
    {
        tag: "Functionality",
        count: 5,
        color: "#979797"
    },
    {
        tag: "Security",
        count: 1,
        color: "#EB7979"
    }
] 

function TagsCard() {
    const [active_tag, set_active_tag] = useState<string>("all")
    const [colors, set_colors] = useState<string[]>([])
    const MTag = (tag: string, color: string) =>(
        <Tag color={color} className="!mb-2" >
            {tag}
        </Tag>
    )
    const {tags, tag_names, tag_colors} = useIssues()
        useEffect(()=>{
            set_colors(tag_names.map(()=>generateRandomColor() ))
        }, [])
  return (
    <BaseCard className="bg-white !h-full" span={8} >
        {tag_names.length > 0 ? (<BaseDoughnutChart labels={tag_names}   data={ 
            [
                {
                    label: "Tags",
                    data: tag_names.map((name)=>tags.filter(({tag_name})=>tag_name == name).length),
                    backgroundColor: tag_colors,
                    borderColor: "none",
                    borderWidth: 0,
                }
            ]
        }  />): (
            <Empty description="No Issues" />
        )
    }
    </BaseCard>
  )
}

export default TagsCard