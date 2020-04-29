import React from "react"

import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"

import projectImage from "../../images/projects/spinewectator.jpg"

export const frontmatter = {
  title: `Wine Reviews by Robots`,
  description: `Wine reviews by robots.`,
  preview: `projects/spinewectator.jpg`,
  themeColor: `#74080b`, // `#f5f403`,
  backgroundColor: ``,
  updatedAt: `2019-01-02`,
  completed: true,
}

export default () => (
  <Layout>
    <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
      <P style={{textAlign: `left`}}>
        Built a Twitterbot that tweets out wine reviews for made up wines, powered by Markov chains.
      </P>
      <P style={{textAlign: `left`}}>
        Follow <a href="https://twitter.com/wectator">@wectator</a> to get a taste.
      </P>
    </Project>
  </Layout>
)
