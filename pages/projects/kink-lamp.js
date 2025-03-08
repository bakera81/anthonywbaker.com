import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"
import A from '../../components/anchor'

import projectImage from "../../public/images/projects/kink-lamp-2.jpg";
import previewImage from "../../public/images/projects/kink-lamp-4.jpg";

export const frontmatter = {
  title: 'Kink Lamp',
  description: 'Kinky lighting solutions.',
  slug: 'kink-lamp',
  preview: previewImage,
  themeColor: '#323C45', //'#D9E2E0',
  updatedAt: '2023-12-01',
  completed: true,
}

export default function Lamp() {
  return(
    <Layout title="Kink Lamp">
      <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
        <P style={{textAlign: `left`}}>
          Dimmable desk lamp with fur and chain.
          </P>
        <P style={{textAlign: `left`}}>
          <A href="/contact">Contact</A> for pricing.
        </P>
      </Project>
    </Layout>
  )
}