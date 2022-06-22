import { PaperClipOutlined } from '@ant-design/icons'
import { Typography, Upload } from 'antd'
import React from 'react'
import { Text } from '../../pages/_app'

const {Link} = Typography 

function UploadAction() {
  return (
    <Upload showUploadList={true}  >
        <div className="flex flex-row items-center justify-start">
            <PaperClipOutlined className="mr-2" />
            <Text>
                Drag and drop files to attach or <Link>
                    Browse
                </Link>
            </Text>
        </div>
    </Upload>
  )
}

export default UploadAction