import React from "react"

import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import P from "../components/paragraph"

export default ({ data }) => {
  return (
    <Layout hideFooter="true">
      <div className="section">
        <div css={{maxWidth: 500, margin: `auto auto`}}>
          <Img fluid={data.file.childImageSharp.fluid} />
          <P style={{textAlign: `center`}}>Oh no...</P>
          <P style={{textAlign: `center`}}><Link to="/" css={{fontSize: `.7rem`}}>Return home.</Link></P>
        </div>
      </div>
    </Layout>

  )
}

export const query = graphql`
  query {
    file(relativePath: {eq: "renaissance/Portrait_of_Margaret_van_Eyck.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          # ...GatsbyImageSharpFixed
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
