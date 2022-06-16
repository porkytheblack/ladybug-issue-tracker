import React from 'react'
import styled from 'styled-components'

function ProjectCardWithActions() {
  return (
    <CardContainer className="bg-white rounded-[8px] border-[.0.7px] border-[#eaeaea] hover:shadow-black  " ></CardContainer>
  )
}

export default ProjectCardWithActions

const CardContainer = styled.div`
        :hover{
            box-shadow: 0 5px 11px rgb(13 61 98 / 19%);
        }

        transition: box-shadow .2s ease-in;
`