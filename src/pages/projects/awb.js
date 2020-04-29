import React from "react"

import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"

import projectImage from "../../images/projects/awb-2020-2.jpg"

export const frontmatter = {
  title: `anthonywbaker.com`,
  description: `This website.`,
  preview: `projects/awb-2020.jpg`,
  themeColor: `#828cb8`,
  updatedAt: `2020-01-01`,
  completed: true,
}

export default () => (
  <Layout>
    <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
      <P style={{textAlign: `left`}}>I built this site with <a href="">Gatsby</a>, <a href="">Emotion</a>, and <a href="">Bulma</a>.</P>
      <P style={{textAlign: `left`}}>
        I decided to deliberately make this site feel a bit offputting: The fonts are unpleasant to read and mismatched (Microsoft Sans Serif circa Windows 98 and a New York Times knockoff—stalwart fonts of digital and print), text is right aligned, black font and whitespace is juxtaposed with bursts of color from classic Renaissance art.
      </P>
      <P style={{textAlign: `left`}}>
        Hopefully it says something about my fondness for irreverence and my distrust of settling for "normal."
      </P>
    </Project>
  </Layout>
)
