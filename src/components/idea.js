import React from "react"
import styled from "@emotion/styled"

// import {AnchorLink} from "gatsby-plugin-anchor-links"
import hastToHyperscript from "hast-to-hyperscript";
// import GithubSlugger from "github-slugger"
// var slugger = new GithubSlugger()
var slugger = require('github-slugger').slug;



const renderHastToReact = node => {
    return hastToHyperscript(React.createElement, node);
}

const MdContainer = styled.div`
  p {
    font-family: "Microsoft Sans Serif";
    font-smooth: never;
    -webkit-font-smoothing: none;
    font-weight: normal;
    padding-top: 1em;
    padding-bottom: 1em;
  }
`

const Heading = styled.h4`
  margin-bottom: 0 !important;
  font-family: "Microsoft Sans Serif";
  font-smooth: never;
  -webkit-font-smoothing: none;
`
// https://www.gatsbyjs.org/packages/gatsby-plugin-anchor-links/
export default props => (
  <section className="section" css={{padding: `3rem 8rem`}}>
    {/* <AnchorLink to={`/ideas#${slugger(props.heading)}`} title={props.heading} /> */}
    <a id={slugger(props.heading)} href={`/ideas#${slugger(props.heading)}`}><Heading className="title is-4">{props.heading}</Heading></a>
    {/* For each paragraph, render a P and it's children */}
    <MdContainer>
      {props.paragraphs.map(paragraph => (
        renderHastToReact(paragraph)
      ))}
    </MdContainer>
  </section>
)
