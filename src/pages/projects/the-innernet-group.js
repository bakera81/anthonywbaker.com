import React from "react"

import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"

import projectImage from "../../images/projects/innernet-group.png"

export const frontmatter = {
  title: `The Innernet Group`,
  description: `The Innernet Group.`,
  preview: `projects/innernet-group.png`,
  themeColor: `#fff`,
  backgroundColor: `#fff`,
  updatedAt: `2019-01-01`,
  completed: false,
}

export default () => (
  <Layout>
    <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
      <P style={{textAlign: `left`}}>
        Coming soon: <a href="www.theinnernetgroup.com">www.theinnernetgroup.com</a>
      </P>
    </Project>
  </Layout>
)
