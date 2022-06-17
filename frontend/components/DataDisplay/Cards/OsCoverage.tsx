import React from 'react'
import { Text } from '../../../pages/_app'
import BaseVerticalBarChart from '../../Charts/BaseVerticalBarChart'
import BaseCard from '../../Containers/BaseCard'


function OsCoverage() {
  return (
    <BaseCard span={24} className="bg-white w-full" >
        <div className="flex flex-row items-center mb-2 justify-start w-full ">
            <Text className='!text-black text-lg font-medium ' >
                    Platform Coverage
            </Text>
        </div>
        <BaseVerticalBarChart data={[3, 5, 6, 1]} colors={["red", "orange", "blue"]} labels={["Web", "Android", "Desktop"]} />
    </BaseCard>
  )
}

export default OsCoverage