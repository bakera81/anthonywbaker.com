import React from "react"
import styled from "@emotion/styled"

 const Hr = styled.hr`
  width: 100px;
  margin-left: auto;
  margin-right: 0;
  height: 1px;
`

const HorizontalRule = () =>{
  return (
    <Hr className="has-background-grey-lighter"/>
  )
}
export default HorizontalRule;
