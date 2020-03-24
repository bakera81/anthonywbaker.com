import React from "react"

import { css } from "@emotion/core"
import 'bulma/css/bulma.css'

import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import P from "./paragraph"


export default () => {
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

  const randomImg =  data.allFile.edges[Math.floor(Math.random() * data.allFile.edges.length)]

  return (
    <footer className="footer" css={{padding: `3rem 0rem 1rem;`}}>
      <Img fluid={randomImg.node.childImageSharp.fluid} />
      <div className="level">
        <div className="level-item">
          <P><Link to="/about">about</Link></P>
        </div>
        <div className="level-item">
          <P><Link to="/projects">projects</Link></P>
        </div>
        <div className="level-item">
          <P><Link to="/data">data</Link></P>
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
    </footer>
  )
}
