import _ from 'lodash'
import React from 'react'
import { generateRandomColor } from '../../../helpers/randomColor'
import useIssues from '../../../hooks/useIssues'
import { Text } from '../../../pages/_app'
import BaseVerticalBarChart from '../../Charts/BaseVerticalBarChart'
import BaseCard from '../../Containers/BaseCard'


function OsCoverage() {

  const {platforms, platorm_colors} = useIssues()

  return (
    <BaseCard span={24} className="bg-white w-full" >
        <div className="flex flex-row items-center mb-2 justify-start w-full ">
            <Text className='!text-black text-lg font-medium ' >
                    Platform Coverage
            </Text>
        </div>
        <BaseVerticalBarChart data={_.uniq(platforms).map((platform)=>platforms.filter((p)=>p == platform).length)} colors={_.uniq(platforms).map(()=>generateRandomColor())} labels={ typeof platforms == "undefined" ? [] : _.uniq(platforms) as any} />
    </BaseCard>
  )
}

export default OsCoverage