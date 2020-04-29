import React from "react"

import styled from "@emotion/styled"
import 'bulma/css/bulma.css'

import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from "gatsby-image"

const PageTitle = styled.h1`
  font-family: Chomsky;
  font-size: 5rem !important;
  font-weight: normal;
  text-align: right;
`

export default props => {
   const data = useStaticQuery(
     graphql`
       query {
         allFile(filter: {relativePath: {regex: "/renaissance/"}}) {
           edges {
             node {
               relativePath
               childImageSharp {
                 fixed(height: 80) {
                   ...GatsbyImageSharpFixed
                 }
               }
             }
           }
         }
       }
     `
  )

  const randomImg =  data.allFile.edges[Math.floor(Math.random() * data.allFile.edges.length)]
  console.log(randomImg)
  return (
    <section className="section">
      <div className="container">
        <div className="level">
          <div className="level-right has-text-right" css={{marginLeft: `auto;`, marginRight: `15px;`}}>
          {/*TODO: FLip this to fluid and make it fill the height */}
            <Img fixed={randomImg.node.childImageSharp.fixed} />
          </div>
          <div className="level-right">
            <PageTitle className="title is-1">{props.children}</PageTitle>
          </div>
        </div>
      </div>
    </section>
  )
}
