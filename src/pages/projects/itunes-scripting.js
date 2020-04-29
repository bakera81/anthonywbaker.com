import React from "react"

import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"

import projectImage from "../../images/projects/itunes.png"

export const frontmatter = {
  title: `iTunes AppleScripts`,
  description: `AppleScripts for iTunes.`,
  preview: `projects/itunes.png`,
  themeColor: `#ff6180`,
  backgroundColor: `#ff6180`,
  updatedAt: `2019-01-01`,
  completed: true,
}

export default () => (
  <Layout>
    <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
      <P style={{textAlign: `left`}}>
        Wrote AppleScripts to clean my iTunes library. Functions could remove duplicate songs, create backup records of playlists, and match songs to Apple Music versions. A clean music library is a true indicator of a person's character.
      </P>
    </Project>
  </Layout>
)
