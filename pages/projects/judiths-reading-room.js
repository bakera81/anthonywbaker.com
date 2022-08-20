import Layout from '../../components/layout'
import Project from '../../components/project'
import P from '../../components/paragraph'

import projectImage from '../../public/images/projects/jrr-logo.png'

export const frontmatter = {
  title: 'Judith\'s Reading Room',
  description: 'Judith\'s Reading Room.',
  preview: projectImage,
  slug: 'judiths-reading-room',
  themeColor: '#ef3741',
  updatedAt: '2015-01-01',
  completed: true,
}

export default function JRR(){
    return(
        <Layout>
            <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
            <P style={{textAlign: `left`}}>
                <a href="http://www.judithsreadingroom.org/" target="_blank">Judith's Reading Room</a> is a nonprofit that creates and donates custom libraries around the world and promotes literacy through its <a href="http://www.judithsreadingroom.org/freedom-through-literacy-award/">Freedom Through Literacy Award</a>.
            </P>
            <P style={{textAlign: `left`}}>
                In 2015, I redesigned Judith's Reading Room's website focusing on branding, Search Engine Optimization, and ease-of-use to expand the group's reach and visibility. Judith's Reading Room recieved more international applications in the months following the redesign than in the previous four years.
            </P>
            </Project>
        </Layout>
    )
}