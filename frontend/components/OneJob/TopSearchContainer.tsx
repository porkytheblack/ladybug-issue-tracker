import { Button, Col, Row, Select } from 'antd'
import React from 'react'
import styled from 'styled-components'
import CustomSearch from '../Custom/CustomSearchBox'
import {useSearchBox} from "react-instantsearch-hooks" 
import { SearchBox } from 'react-instantsearch-dom'
import { PlusOutlined } from '@ant-design/icons'

const {Option} = Select

function TopSearchContainer() {
  return (
        <CustomContainer align="middle" justify='space-between' className="w-full " >
            <Col span={4} >
                    <SearchBox/>
            </Col>
            <Col span={3}  >
                <Select className="w-full" defaultValue={"all_teams"}  >
                    <Option value="all_teams" >
                        All Teams
                    </Option>
                    <Option  value="d_house_dev" >
                        d_house_dev
                    </Option>
                </Select>
            </Col>
            <Col span={3}  >
                <Select className="w-full" defaultValue={"all_platforms"}  >
                    <Option value="all_platforms" >
                        All Platforms
                    </Option>
                    <Option  value="Android" >
                        Android
                    </Option>
                    <Option  value="ios" >
                        IOS
                    </Option>
                    <Option  value="mobile_web" >
                        Mobile Web
                    </Option>
                </Select>
            </Col>
            <Col span={3}  >
                <Select className="w-full" defaultValue={"all"}  >
                    <Option value="all" >
                        All
                    </Option>
                    <Option  value="Active" >
                        Active
                    </Option>
                    <Option  value="Archived" >
                        Archived
                    </Option>
                </Select>
            </Col>
            <Col span={7} ></Col>
            <Col span={3} >
                <Button icon={<PlusOutlined/>} type="primary" >
                    Create Project
                </Button>
            </Col>
            
        </CustomContainer>
  )
}

export default TopSearchContainer

const CustomContainer = styled(Row)``