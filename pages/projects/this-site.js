import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"

import projectImage from "../../public/images/projects/awb-2020-2.jpg";
import previewImage from "../../public/images/projects/awb-2020.jpg";

export const frontmatter = {
  title: 'Anthony.Computer',
  description: 'This website.',
  slug: 'this-site',
  preview: previewImage,
  themeColor: '#828cb8',
  updatedAt: '2022-08-01',
  completed: true,
}

export default function Awb() {
  return(
    <Layout title="This website">
      <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
        <P style={{textAlign: `left`}}>
          I built this site from scratch (with love) using <a href="https://nextjs.org/" target="_blank">NextJS</a>.
        </P>
        <P style={{textAlign: `left`}}>
          This site is a work in progress. It's also where I share my work in progress. 
          I'm not on social media, so this is where I stash ideas I'm processing, recipes I'm iterating on, my stories, my dreams, my side hustles.
        </P>
        <P style={{textAlign: `left`}}>
          I designed this site around my love of dualities: 
          black/white with big bursts of color, digital media alongside Renaissance art, 
          Microsoft Sans Serif (circa Windows 98) juxtaposed with an old newspaper typeface. 
          I hope you find it a little silly, a little irreverent, and a bit off-kilter. 
        </P>
      </Project>
    </Layout>
  )
}
