import React from "react"

import styled from "@emotion/styled"

const P = styled.p`
  font-family: "Microsoft Sans Serif";
  font-smooth: never;
  -webkit-font-smoothing : none;
  font-weight: normal;
  text-align: right;
  padding-top: 1em;
  padding-bottom: 1em;
`

export default props => (
  <P css={props.style}>{props.children}</P>
)
