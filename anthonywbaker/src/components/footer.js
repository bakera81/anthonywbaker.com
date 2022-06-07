import React from "react"

import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage  } from "gatsby-plugin-image";

import P from "./paragraph"


export default props => {
  const data = useStaticQuery(
    graphql`{
  allFile(
    filter: {relativePath: {regex: "/renaissance/"}, childImageSharp: {internal: {type: {eq: "ImageSharp"}}}}
  ) {
    edges {
      node {
        relativePath
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
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
          <P><a href="https://medium.com/@addiebundren" target="_blank" rel="noreferrer">writing</a></P>
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
      <GatsbyImage
        image={randomImg.node.childImageSharp.gatsbyImageData}
        imgStyle={{objectFit: `cover`, objectPosition: `50% ${randomCropPct}%`, height: `250px`}}
        style={{height: `250px`}} />
      {renderNav(props.hideNav)}
    </footer>
  );
}
