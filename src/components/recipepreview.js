import React from "react"

import styled from "@emotion/styled"
import { css } from "@emotion/core"
import 'bulma/css/bulma.css'

import { Link } from "gatsby"


const recipeblock = css`
  /* font-style: italic; */
  /* color: #333; */
  font-weight: 300;
  /* &:hover{
    color: #000;
    text-decoration: underline;
  } */
`

const Block = styled.div`
  text-align: center;
  padding-bottom: 6em;
  /* height: 150px; */
  padding: 5px 15px 0 15px;
  /* &:hover{
    background-color: #e7e7e7;
  } */
`

const RecipeTitle = styled.h5`
  font-family: "Microsoft Sans Serif";
  font-smooth: never;
  -webkit-font-smoothing : none;
  font-weight: normal;
  text-align: right;
  padding-top: 1em;
  padding-bottom: 1em;
`


export default props => (
  <Block className="column is-one-third-desktop is-half-tablet">
    <Link to={props.slug} css={recipeblock}>
        <RecipeTitle className="is-size-5">{props.title}</RecipeTitle>
    </Link>
    </Block>
)
