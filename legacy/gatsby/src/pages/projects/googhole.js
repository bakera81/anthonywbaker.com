import React from "react"

import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"

import projectImage from "../../images/projects/Gh.png"

export const frontmatter = {
  title: `Googhole`,
  description: `The Existential Search Engine.`,
  preview: `projects/Gh.png`,
  themeColor: `#4385F4`,
  updatedAt: `2015-12-01`,
  completed: true,
}

export default () => (
  <Layout>
    <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
      <P style={{textAlign: `left`}}>Rather than serving up a glut of information, Googhole.net does the opposite: it forces us to pause and reflect on our ultimate insignificance.</P>
      <P style={{textAlign: `left`}}><a href="https://googhole.net/" target="_blank">Enter the Googhole.</a></P>
    </Project>
  </Layout>
)