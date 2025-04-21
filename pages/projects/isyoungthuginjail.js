import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"
import A from '../../components/anchor'

import projectImage from "../../public/images/projects/business-is-business.webp";
import previewImage from "../../public/images/projects/slime-season-3.jpg";

export const frontmatter = {
  title: 'isyoungthuginjail.com',
  description: 'Is Young Thug in jail?',
  slug: 'isyoungthuginjail',
  preview: previewImage,
  themeColor:  '#510303', // '#6E3E35', // '#0D0505', 
  updatedAt: '2022-05-19',
  completed: true,
}

export default function Thugger() {
  return(
    <Layout title="isyoungthuginjail.com">
      <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
        <P style={{textAlign: `left`}}>
        Young Thug is an iconoclast. <A href="https://www.wired.com/2015/10/young-thug-evolution-of-language/" target="_blank">Linguists study him.</A> <A href="https://isyoungthuginjail.com" target="_blank">Is he in jail?</A>
        </P>
      </Project>
    </Layout>
  )
}