import Header from '../../components/header'
import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"

import projectImage from "../../public/images/projects/awb-2020-2.jpg";
import previewImage from "../../public/images/projects/awb-2020.jpg";

export const frontmatter = {
  title: 'anthonywbaker.com',
  description: 'This website.',
  slug: 'anthonywbaker',
  preview: 'projects/awb-2020.jpg',
  previewImage: previewImage,
  themeColor: '#828cb8',
  backgroundColor: '#828cb8',
  updatedAt: '2020-01-01',
  completed: true,
}

export default function Awb() {
  return(
    <>
    <Header>This website</Header>
    <Layout>
      <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
        <P style={{textAlign: `left`}}>I built this site from scratch (with love) using <a href="https://nextjs.org/" target="_blank">NextJS</a>.</P>
        <P style={{textAlign: `left`}}>
          I decided to deliberately make this site feel a bit offputting: The fonts are unpleasant to read and mismatched (Microsoft Sans Serif circa Windows 98 and a New York Times knockoff—stalwart fonts of digital and print), text is right aligned, black font and whitespace is juxtaposed with bursts of color from classic Renaissance art.
        </P>
        <P style={{textAlign: `left`}}>
          For a personal website, I think the design is a bit irreverent.
        </P>
      </Project>
    </Layout>
    </>
  )
}