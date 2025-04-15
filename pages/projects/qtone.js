import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"
import A from '../../components/anchor'

import projectImage from "../../public/images/projects/gustave_gaillebotte_plain_of_gennevilliers.jpg";
import previewImage from "../../public/images/projects/gustave_gaillebotte_plain_of_gennevilliers_square.jpg";

export const frontmatter = {
  title: 'qtone',
  description: 'Realtime AI communication coach.',
  slug: 'qtone',
  preview: previewImage,
  themeColor: '#849669', 
  updatedAt: '2025-02-01',
  completed: true,
}

export default function Qtone() {
  return(
    <Layout title="qtone">
      <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
        <P style={{textAlign: `left`}}>
          qtone is an AI tone-of-voice coach to help remote workers minimize frustration, communicate effectively, and be happier at work.
        </P>
        <P style={{textAlign: `left`}}>
          Visit <A href="https://qtone.xyz">qtone.xyz</A> to join the waitlist.
        </P>
      </Project>
    </Layout>
  )
}