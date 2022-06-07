import React from "react"

import styled from "@emotion/styled"
import { css } from "@emotion/react"

import { Link } from "gatsby"


const contactblock = css`
  font-style: italic;
  color: #333;
  font-weight: 300;
  &:hover{
    color: #000;
    text-decoration: underline;
  }
`

const Block = styled.div`
  height: 150px;
  padding: 5px 15px 0 15px;
  &:hover{
    background-color: #e7e7e7;
  }
`

const blocktitle = css`
  font-weight: 300;
`

export default props => (
  <div className="column is-3">
    <Link to={props.slug} css={contactblock}>
      <Block>
        <h3 className="is-size-3" css={blocktitle}>{props.title.toUpperCase()}</h3>
        <p>{props.text}</p>
      </Block>
    </Link>
  </div>
)
