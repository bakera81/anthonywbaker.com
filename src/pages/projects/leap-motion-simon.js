import React from "react"

import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"

import projectImage from "../../images/projects/simon.png"

export const frontmatter = {
  title: `Working Memory Research Software`,
  description: `Working memory research software.`,
  preview: `projects/simon.png`,
  themeColor: `#30caea`, // `#f5f403`,
  backgroundColor: `#30caea`, //`#f5f403`,
  updatedAt: `2014-05-01`,
  completed: true,
}

export default () => (
  <Layout>
    <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
      <P style={{textAlign: `left`}}>
        I was a member of a team that created a software version of the game Simon using a <a href="https://developer.leapmotion.com/">Leap Motion Controller</a> designed to research working memory in blind and visually impaired people. The Simon is commonly used to study working memory, however, the original game requires working eyesight.
      </P>
      <P style={{textAlign: `left`}}>
        Users played our version of the game by using physical gestures (captured by the Leap Motion Controller) and responding to sounds rather the traditional Simon interface. The software captured gameplay data and allowed researchers to easily export it for analysis. The software was written in C++ and came with installers for Mac, Windows, and Linux.
      </P>
    </Project>
  </Layout>
)
