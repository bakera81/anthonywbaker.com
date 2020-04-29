import React from "react"

import graphql from "gatsby"

import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"

import projectImage from "../../images/projects/exomuscle-driving.gif"
import slides from "../../images/projects/exomuscle.pdf"

export const frontmatter = {
  title: `ExoMuscle`,
  description: `Pneumatically-actuated t-shirt.`,
  preview: `projects/exomuscle.png`,
  themeColor: `#212120`,
  updatedAt: `2016-01-01`,
  completed: true,
}

export default ({ data }) => (
  <Layout>
    <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
      <P style={{textAlign: `left`}}>
        Whereas muscles convey information about the immediate physical world through kinesthetic feedback, ExoMuscle can convey information about the non-physical (digital) world beyond the reach of your immediate space. I was a member of the team that developed the concept, created a prototype, and proposed three applications: sensing driving mistakes, syncing with a calender to let users feel the "pressure" of time, and giving wearers a sixth sense by letting users feel radiofrequencies.
      </P>
      <P style={{textAlign: `left`}}>
        <a href={slides}>slides</a>
      </P>
    </Project>
  </Layout>
)
