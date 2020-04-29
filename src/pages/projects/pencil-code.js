import React from "react"

import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"

import projectImage from "../../images/projects/pencil-code-tree.png"

export const frontmatter = {
  title: `Pencil Code for Educators`,
  description: `Pencil Code for educators.`,
  preview: `projects/pencil-code-tree.png`,
  themeColor: `#007F00`,
  updatedAt: `2015-10-01`,
  completed: true,
}

export default () => (
  <Layout>
    <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
      <P style={{textAlign: `left`}}>Pencil Code is a block-based programming language designed to teach computer science and algortihmic thinking. Working with Google, I led a small team that built a prototype of a website for educators to share resources and gain inspiration to teach using Pencil Code. I conducted UX research to guide the site through several iterations.</P>
    </Project>
  </Layout>
)
