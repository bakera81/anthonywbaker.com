import React from "react"

import { css } from "@emotion/core"

import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"
import Layout from "./layout"
import PageTitle from "./pagetitle"


export default props => {
  const imgOrder = props.imgRight ? 1 : 0
  return (
    <>
      <PageTitle>{props.title}</PageTitle>
      <section className="section">
        <div css={{alignItems: `center;`}} className="columns">
          <div className="column" css={{order: `${imgOrder}`}}>
            <img css={{display: `block;`, margin: `0 auto;`}} src={props.imgSrc} />
          </div>
          <div className="column">
            {props.children}
          </div>
        </div>
      </section>
    </>
  )
}
