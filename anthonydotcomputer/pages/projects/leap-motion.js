import Layout from '../../components/layout'
import Project from '../../components/project'
import P from '../../components/paragraph'

import projectImage from '../../public/images/projects/simon.png'

export const frontmatter = {
  title: 'Working Memory Research Software',
  description: 'Working memory research software.',
  slug: 'leap-motion',
  preview: projectImage,
  themeColor: '#30caea', // '#f5f403',
  updatedAt: '2014-05-01',
  completed: true,
}

export default function LeapMotion() {
    return (
        <Layout title={frontmatter.title}>
            <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
            <P style={{textAlign: `left`}}>
                I was a member of a team that created a software version of the game Simon using a <a href="https://developer.leapmotion.com/" target="_blank">Leap Motion Controller</a> designed to research working memory in blind and visually impaired people. Simon is commonly used to study working memory, however, the original game requires working eyesight.
            </P>
            <P style={{textAlign: `left`}}>
                Users played our version of the game by using physical gestures (captured by the Leap Motion Controller) and responding to sounds rather the traditional Simon interface. The software captured gameplay data and allowed researchers to easily export it for analysis. The software was written in C++ and came with installers for Mac, Windows, and Linux.
            </P>
            </Project>
        </Layout>
    )
}