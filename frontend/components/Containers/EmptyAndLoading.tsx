import { Empty, Skeleton } from 'antd'
import { isArray, isNull, isUndefined } from 'lodash'
import React, { ReactNode } from 'react'

function EmptyAndLoading({children,className, empty_description, showLoading, loading}:{children?: ReactNode | ReactNode[],className: string, empty_description?: string, showLoading?: boolean, loading?: boolean}) {
  return (
    <div className={`${className}`}>
        {
            (isUndefined(children) || (isArray(children) && children.length == 0 ) || isNull(children) ) ? (
                (isUndefined(showLoading) || isUndefined(loading) ) ?
                <Empty  description={empty_description} /> 
                :
                loading ? <Skeleton>

                </Skeleton>
                : <Empty description={empty_description} /> 
            ): (
                children
            )
        }
    </div>
  )
}

export default EmptyAndLoading