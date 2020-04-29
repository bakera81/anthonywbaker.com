import React from "react"

import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"

import projectImage from "../../images/projects/tangible-programming-3.png"

export const frontmatter = {
  title: `Tangible Programming Environment`,
  description: `Tangible programming environment.`,
  preview: `projects/tangible-programming-3.png`,
  themeColor: `rgb(43, 36, 33)`,
  updatedAt: `2016-02-01`,
  completed: true,
}

export default () => (
  <Layout>
    <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
      <P style={{textAlign: `left`}}>
        Using the TRANSFORM shape displays at the MIT Media Lab's <a href="https://tangible.media.mit.edu/">Tangible Media Group</a>, I worked with a small team to develop a physical programming language that used gestures and physical interaction to perform basic commands.
      </P>
      <P style={{textAlign: `left`}}>
        Computer programming is a skill with a high initial learning curve, which can often discourage early learners. Our team developed a tactile, holistic programming environment that leveraged the benefits of tangibility to help learners develop a more resilient understanding of computer science concepts.
      </P>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/YxnHD9bZj-Y" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </Project>
  </Layout>
)
