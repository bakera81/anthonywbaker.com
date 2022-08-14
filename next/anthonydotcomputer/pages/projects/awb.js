import Header from '../../components/header'
import Layout from "../../components/layout"
// import Project from "../../components/project"
import P from "../../components/paragraph"

import projectImage from "../../public/images/projects/awb-2020-2.jpg";

export { projectImage };

export const frontmatter = {
  title: `anthonywbaker.com`,
  description: `This website.`,
  slug: 'awb',
  preview: `projects/awb-2020.jpg`,
  previewImage: projectImage,
  themeColor: `#828cb8`,
  updatedAt: `2020-01-01`,
  completed: true,
}

export default function Awb() {
  <Layout>
    {/* <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
      <P style={{textAlign: `left`}}>I built this site with <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby</a>, <a href="https://emotion.sh/docs/introduction" target="_blank">Emotion</a>, and <a href="https://bulma.io/" target="_blank">Bulma</a>.</P>
      <P style={{textAlign: `left`}}>
        I decided to deliberately make this site feel a bit offputting: The fonts are unpleasant to read and mismatched (Microsoft Sans Serif circa Windows 98 and a New York Times knockoff—stalwart fonts of digital and print), text is right aligned, black font and whitespace is juxtaposed with bursts of color from classic Renaissance art.
      </P>
      <P style={{textAlign: `left`}}>
        I think it says something about my fondness for irreverence.
      </P>
    </Project> */}
  </Layout>
}