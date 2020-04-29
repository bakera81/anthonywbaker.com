import React from "react"

import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"

import projectImage from "../../images/projects/fun-portrait-mature-businessman-holding-old-laptop.jpg"

export const frontmatter = {
  title: `Lonked.In`,
  description: `The world's worst job search site.`,
  preview: `projects/fun-portrait-mature-businessman-holding-old-laptop.jpg`,
  themeColor: `#fff`,
  backgroundColor: `#fff`,
  updatedAt: `2019-04-01`,
  completed: false,
}

export default () => (
  <Layout>
    <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
      <P style={{textAlign: `left`}}>
        Lonk and load, the world's worst job search site is coming soon. Lonk in and launch a new career. <a href="http://www.lonked.in">www.lonked.in</a>
      </P>
    </Project>
  </Layout>
)
