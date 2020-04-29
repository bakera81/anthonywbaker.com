import React from "react"

import { css } from "@emotion/core"

import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import P from "./paragraph"


export default props => {
  const data = useStaticQuery(
    graphql`
      query {
        allFile(filter: {relativePath: {regex: "/renaissance/"}}) {
          edges {
            node {
              relativePath
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                  presentationWidth
                }
              }
            }
          }
        }
      }
    `
  )

  const randomImg =  data.allFile.edges[Math.floor(Math.random() * data.allFile.edges.length)];
  const randomCropPct = Math.floor(Math.random() * 11) * 10;

  const renderNav = hideNav => {
    if (hideNav) {
      return
    }
    return (
      <div className="level">
        <div className="level-item">
          <P><Link to="/about">about</Link></P>
        </div>
        <div className="level-item">
          <P><Link to="/projects">projects</Link></P>
        </div>
        <div className="level-item">
          <P><Link to="/ideas">ideas</Link></P>
        </div>
        <div className="level-item">
          <P><Link to="/recipes">recipes</Link></P>
        </div>
        <div className="level-item">
          <P><Link to="/writing">writing</Link></P>
        </div>
        <div className="level-item">
          <P><Link to="/contact">contact</Link></P>
        </div>
      </div>
    )
  }

  return (
    <footer className="footer"
            css={{backgroundColor: `white`, padding: `3rem 0rem ${props.hideNav ? `0rem` : `1rem`}`}}>
      <Img fluid={randomImg.node.childImageSharp.fluid}
           imgStyle={{objectFit: `cover`, objectPosition: `50% ${randomCropPct}%`, height: `250px`}}
           style={{height: `250px`}} />
      {renderNav(props.hideNav)}
    </footer>
  )
}
