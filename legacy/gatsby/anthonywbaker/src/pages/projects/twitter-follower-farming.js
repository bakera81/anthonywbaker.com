import React from "react"

import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"

import projectImage from "../../images/projects/djsplattermommy.png"

const frontmatter = {
  title: `Farming Twitter Followers`,
  description: `Farming Twitter followers.`,
  preview: `projects/djsplattermommy.png`,
  themeColor: `rgb(35, 98, 79)`,
  updatedAt: `2014-01-01`,
  completed: true,
}

const TwitterFarming = () => (
  <Layout>
    <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
      <P style={{textAlign: `left`}}>
        Wrote scripts to gain followers by selectively following and unfollowing users (<a href="https://twitter.com/hashtag/TeamFollowBack?src=hashtag_click" target="_blank" rel="noreferrer">#teamfollowback</a>). Reached over 900 followers in two weeks. The account tweeted contemporary rap lyrics set to images of Maoist baby propaganda.
      </P>
    </Project>
  </Layout>
)

export default TwitterFarming
