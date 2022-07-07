import { EyeOutlined } from '@ant-design/icons'
import { Image } from 'antd'
import React, { useState } from 'react'
import { Text } from '../../pages/_app'
import ImagePreview from './ImagePreview'

function ImageWithPreview({image, _key}:{image: string, _key: string}) {
    const [preview, set_preview] = useState<boolean>(false)
  return (
    <div className="flex flex-row  items-center mr-2 mb-2 cursor-pointer justify-center group w-[200px] relative">
        <ImagePreview _key={_key}  onClose={()=>{set_preview(false)}} image={image} visible={preview} />
        <Image width={200} preview={false} src={image} />
        <div onClick={()=>{set_preview(true)}} className="hidden flex-row w-full h-full bg-[#00000060] items-center top-0 left-0 justify-center cursor-pointer absolute group-hover:flex ">
                <EyeOutlined className="text-white" />
                 <Text className="!text-white ml-1" >
                    Preview
                 </Text>
        </div>
    </div>
  )
}

export default ImageWithPreview