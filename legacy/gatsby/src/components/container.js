import React from "react"

import styled from "@emotion/styled"

const Container = styled.div`
`

export default ({ children }) => (
  <Container className="columns is-multiline">{children}</Container>
)
