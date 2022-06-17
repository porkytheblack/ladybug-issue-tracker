import React, { useState } from 'react'
import { tagStat } from '../../../globaltypes'
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
    const Tag = (tag: string, color: string) =>(
        <button onClick={()=>{set_active_tag(tag)}} style={{borderColor: color}} className="!bg-none border-[.07px] min-w-[60px] max-w-[100%]  flex-wrap m-[2px] !outline-none rounded-[2px] !p-[2px]  " >
            <Text style={{color}}  >
                {tag}
            </Text>
        </button>
    )
  return (
    <BaseCard className="bg-white !h-full" span={8} >
        <BaseDoughnutChart    data={ 
            [
                {
                    label: "Tags",
                    data: TagStats.map(({count})=>count),
                    backgroundColor: TagStats.map(({color})=>color),
                   borderColor: TagStats.map(({color})=>color)
                }
            ]
        }  />
        <div className="flex flex-row items-center flex-wrap w-full justify-start pt-4">
            {
                TagStats.map(({tag, count, color})=>(Tag(tag, color)))
            }
        </div>
    </BaseCard>
  )
}

export default TagsCard