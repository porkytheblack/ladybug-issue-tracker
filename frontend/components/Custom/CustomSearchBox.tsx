import { RestOutlined } from '@ant-design/icons'
import { Button, Form, Input, Typography } from 'antd'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

const {Search} = Input
const {Text} = Typography

function SearchBox({currentRefinement, isSearchStalled, refine}: {currentRefinement: string, isSearchStalled: boolean, refine: (a: any)=>void}) {
    useEffect(()=>{
        console.log(currentRefinement)
    }, [currentRefinement])
    return (
    <div className="flex flex-col items-start justify-start">
        <Search onChange={(e)=>refine(e.currentTarget.value) } placeholder={"Search"} value={currentRefinement} disabled={isSearchStalled} />
        {isSearchStalled ? <Text className="text-xs !text-red-500 mt-1 " >
            Search is Stalled
        </Text> : ""}
    </div>
    
  )
}

const CustomSearch = connectSearchBox(SearchBox)  
export default CustomSearch
