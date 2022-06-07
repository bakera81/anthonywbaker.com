import React from "react"

import styled from "@emotion/styled"
import "../styles/global.scss"

import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";

const PageTitle = styled.h1`
  font-family: Chomsky;
  font-weight: normal;
  text-align: right;
  @media screen and (max-width: 400px) {
    font-size: 3rem !important;
  }
  /* font-size: calc(3rem + 3vw); */
  /* font-size: 5rem !important; */
  /* Perf optimization for fitty: */
  /* display: inline-block;
  white-space: nowrap;
 font-size: 3rem;
  */
`

export default props => {
   const data = useStaticQuery(
     graphql`{
  allFile(filter: {relativePath: {regex: "/renaissance/"}}) {
    edges {
      node {
        relativePath
        childImageSharp {
          gatsbyImageData(height: 85, layout: FIXED)
        }
      }
    }
  }
}
`
  )

  const randomImg =  data.allFile.edges[Math.floor(Math.random() * data.allFile.edges.length)]
  return (
    <section className="section" css={{padding: `3rem 0 3rem 0`}}>
      <div className="container">
        <div className="level">
          <div className="level-right has-text-right is-hidden-mobile" css={{marginLeft: `auto;`, marginRight: `15px;`}}>
          {/*TODO: FLip this to fluid and make it fill the height title is-1  */}
            <GatsbyImage image={randomImg.node.childImageSharp.gatsbyImageData} />
          </div>
          <div className="level-right">
            <PageTitle className="title is-1">{props.children}</PageTitle>
          </div>
        </div>
      </div>
    </section>
  );
}
