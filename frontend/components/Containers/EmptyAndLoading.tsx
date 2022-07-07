import { Empty, Skeleton, Spin } from 'antd'
import { isArray, isBoolean, isNull, isUndefined } from 'lodash'
import React, { ReactNode } from 'react'
import { Text } from '../../pages/_app'

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
              isBoolean(showLoading) && isBoolean(loading) && loading ? 
                <div className="flex flex-row ml-0 h-12 w-full items-center justify-center">
                  <Spin/>
                </div>
              :
                children
            )
        }
    </div>
  )
}

export default EmptyAndLoading