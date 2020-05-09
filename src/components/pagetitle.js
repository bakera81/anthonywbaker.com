import React from "react"

import styled from "@emotion/styled"
import 'bulma/css/bulma.css'

import { useStaticQuery, graphql } from 'gatsby'
import Img from "gatsby-image"

const PageTitle = styled.h1`
  font-family: Chomsky;
  font-weight: normal;
  text-align: right;
  font-size: calc(3rem + 3vw);
  /* font-size: 5rem !important; */
  /* Perf optimization for fitty: */
  /* display: inline-block;
  white-space: nowrap;
 font-size: 3rem;
  @media screen and (min-width: 796px) {
    color: red;
  }
  */
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
  return (
    <section className="section">
      <div className="container">
        <div className="level">
          <div className="level-right has-text-right is-hidden-mobile" css={{marginLeft: `auto;`, marginRight: `15px;`}}>
          {/*TODO: FLip this to fluid and make it fill the height title is-1  */}
            <Img fixed={randomImg.node.childImageSharp.fixed} />
          </div>
          <div className="level-right">
            <PageTitle className="fit">{props.children}</PageTitle>
          </div>
        </div>
      </div>
    </section>
  )
}
