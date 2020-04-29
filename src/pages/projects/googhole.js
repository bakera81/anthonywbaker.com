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
    <Project imgRight title={frontmatter.description} imgSrc={projectImage}>
      <P style={{textAlign: `left`}}>We have no limits to our world. We're only limited by our imagination. I will take some magic white, and a little bit of Vandyke brown and a little touch of yellow. And I know you're saying, 'Oh Bob, you've done it this time.' And you may be right. Automatically, all of these beautiful, beautiful things will happen. You can create beautiful things - but you have to see them in your mind first. All you need is a dream in your heart, and an almighty knife.</P>
      <P style={{textAlign: `left`}}>Everyone needs a friend. Friends are the most valuable things in the world. The very fact that you're aware of suffering is enough reason to be overjoyed that you're alive and can experience it. Let's make a nice big leafy tree. A little happy sunlight shining through there. If these lines aren't straight, your water's going to run right out of your painting and get your floor wet. Let's make some happy little clouds in our world.</P>
    </Project>
  </Layout>
)
