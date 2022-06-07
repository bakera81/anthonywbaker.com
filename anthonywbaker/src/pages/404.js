import React from "react"

import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

import Layout from "../components/layout"
import P from "../components/paragraph"

const FourOhFour = ({ data }) => {
  return (
    <Layout hideFooter="true">
      <div className="section">
        <div css={{maxWidth: 500, margin: `auto auto`}}>
          <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} />
          <P style={{textAlign: `center`}}>Oh no...</P>
          <P style={{textAlign: `center`}}><Link to="/" css={{fontSize: `.7rem`}}>Return home.</Link></P>
        </div>
      </div>
    </Layout>
  );
}

export default FourOhFour;

export const query = graphql`{
  file(relativePath: {eq: "renaissance/Portrait_of_Margaret_van_Eyck.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 500, layout: CONSTRAINED)
    }
  }
}
`
