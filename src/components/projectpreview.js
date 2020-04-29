import React from "react"

import { css } from "@emotion/core"

import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"
import P from "./paragraph"


export default props => {
  // const containerClasses = props.alignRight == true ? `column is-half is-offset-half` : `column is-half`
  return (
    <div className="column is-one-quarter-desktop is-half-tablet" css={{textAlign: `center`, paddingBottom: `6em`}}>
      <Link to={props.slug}>
        <Img fixed={props.imgSrc.childImageSharp.fixed}
             imgStyle={{border: `33px solid ${props.themeColor}`, backgroundColor: props.backgroundColor}}
             style={{backgroundColor: props.backgroundColor}}/>
      </Link>
      <P style={{fontSize: `.7em`, textAlign: `center`}}>{props.description}</P>
    </div>
  )
}
