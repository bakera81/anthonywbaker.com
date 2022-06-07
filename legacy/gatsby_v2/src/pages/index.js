import React from "react"

import { css } from "@emotion/core"

import { Link } from 'gatsby'
import Layout from "../components/layout"

const listLinkStyle = css`
  /* font-family: "Pixel Arial 11"; */
  font-family: Chomsky;
  font-smooth: never;
  -webkit-font-smoothing : none;
  font-weight: normal;
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    font-size: 2.5rem !important;
  }
  @media screen and (min-width: 769px) and (max-width: 860px) {
    font-size: 2rem !important;
  }
`

const levelItemStyle = css`
  @media screen and (max-width: 768px) {
    justify-content: flex-end;
  }
`

const ListLink = props => {
  if (props.href) {
    return (
      <div className="level-item" css={levelItemStyle}>
        <a href={ props.href } target="_blank">
          <h1 className="title is-2" css={listLinkStyle}>{props.children}</h1>
        </a>
      </div>
    )
  }
  return (
    <div className="level-item" css={levelItemStyle}>
    {/* user anchors vs Gatsby links */}
      <Link to={ props.to }>
        <h1 className="title is-2" css={listLinkStyle}>{props.children}</h1>
      </Link>
    </div>
  )
}

export default () => (
  <Layout hideNav hideName>
    <div className="level" css={{minHeight: `calc(100vh - 250px - 3rem - 3rem - 3rem)`}}>
      <ListLink to="/about">About</ListLink>
      <ListLink to="/projects">Projects</ListLink>
      <ListLink to="/ideas">Ideas</ListLink>
      <ListLink to="/recipes">Recipes</ListLink>
      <ListLink href="https://medium.com/@addiebundren">Writing</ListLink>
      <ListLink to="/contact">Contact</ListLink>
    </div>
  </Layout>
)
