import React from "react"

import styled from "@emotion/styled"
import 'bulma/css/bulma.css'

const Container = styled.div`
`

export default ({ children }) => (
  <Container className="columns is-multiline">{children}</Container>
)
