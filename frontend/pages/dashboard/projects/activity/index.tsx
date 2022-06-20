import React from 'react'
import PageBaseContainer from '../../../../components/Containers/PageBaseContainer'
import UpdatesCard from '../../../../components/DataDisplay/Cards/UpdatesCard'

function Activity() {
  return (
    <PageBaseContainer>
      <div className="flex flex-col  items-center justify-start w-full mt-5 ">
        <UpdatesCard className='!max-h-full' />
      </div>
    </PageBaseContainer>
  )
}

export default Activity