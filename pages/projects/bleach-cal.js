import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"
import A from '../../components/anchor'

import projectImage from "../../public/images/projects/bleach-wordmark.png";
import previewImage from "../../public/images/projects/bleach-favicon.svg";

export const frontmatter = {
  title: 'Bleach Calendar',
  description: 'Deep clean your calendar, work better.',
  slug: 'bleach-cal',
  preview: previewImage,
  themeColor: '#FFF', //'#ffcbd8', 
  updatedAt: '2024-02-01',
  completed: true,
}

export default function Bleach() {
  return(
    <Layout title="Bleach">
      <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
        <P style={{textAlign: `left`}}>
          Bleach is a calendar app that facilitates remote work best-practices to help you deep clean your calendar and work better.
        </P>
        <P style={{textAlign: `left`}}>
          Visit <A href="https://bleach-cal.com" target="_blank">bleach-cal.com</A> to join the waitlist.
        </P>
      </Project>
    </Layout>
  )
}