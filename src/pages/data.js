import React from "react"

import { css } from "@emotion/core"

import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import ProjectPreview from "../components/projectpreview"

import sluggify from "../helpers/sluggify"

export default ({ data }) => {
  // TODO:  This feels weird. Where should this live, given it needs `data` and `imagePath`?
  const findPreviewImage = imagePath => {
    const node = data.allFile.edges.find(n => {
        return n.node.relativePath.includes(imagePath);
      })
    return node.node // If this is erroring out, there is a missing frontmatter.preview!
    }

  const completedProjects = data.allJavascriptFrontmatter.edges.filter(node => node.node.frontmatter.completed)
  const inProgressProjects = data.allJavascriptFrontmatter.edges.filter(node => !node.node.frontmatter.completed)

  return (
    <Layout>
      <PageTitle>Data</PageTitle>
      <section className="section" css={{paddingLeft: `0`, paddingRight: `0`}}>
        <div className="columns is-multiline">
          {completedProjects.map(({ node }, i) => (
            <ProjectPreview
              alignRight={i % 2 == 0}
              description={node.frontmatter.description}
              slug={`projects/${sluggify(node.fileAbsolutePath)}`}
              imgSrc={findPreviewImage(node.frontmatter.preview)}
              themeColor={node.frontmatter.themeColor}
              backgroundColor={node.frontmatter.backgroundColor}
            />
          ))}
        </div>
      </section>
      <PageTitle>In Progress</PageTitle>
      <section className="section" css={{paddingLeft: `0`, paddingRight: `0`}}>
        <div className="columns is-multiline">
          {inProgressProjects.map(({ node }, i) => (
            <ProjectPreview
              alignRight={i % 2 == 0}
              description={node.frontmatter.description}
              slug={`projects/${sluggify(node.fileAbsolutePath)}`}
              imgSrc={findPreviewImage(node.frontmatter.preview)}
              themeColor={node.frontmatter.themeColor}
            />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
query {
  # Get all relevant images. Filter them down later
  allFile(filter: {
            relativePath: {regex: "/data/"},
            childImageSharp: {internal: {type: {eq: "ImageSharp"}}}}) {
    edges {
      node {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
          internal {
            type
          }
        }
        relativePath
      }
    }
  }
  # Get all projects
  allJavascriptFrontmatter(sort: {order: DESC, fields: frontmatter___updatedAt},
                           filter: {fileAbsolutePath: {regex: "/data/"}}) {
    edges {
      node {
        fileAbsolutePath
        frontmatter {
          description
          error
          title
          preview
          themeColor
          backgroundColor
          completed
        }
      }
    }
  }
}
`
