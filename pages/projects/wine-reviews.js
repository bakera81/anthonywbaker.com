import Layout from '../../components/layout'
import Project from '../../components/project'
import P from '../../components/paragraph'

import projectImage from '../../public/images/projects/spinewectator.jpg'

export const frontmatter = {
  title: 'Wine Reviews by Robots',
  description: 'Wine reviews by robots.',
  slug: 'wine-reviews',
  preview: projectImage,
  themeColor: '#74080b', // '#f5f403',
  backgroundColor: '',
  updatedAt: '2019-01-02',
  completed: true,
}

export default function Wine() {
    return (
        <Layout title={frontmatter.title}>
            <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
            <P style={{textAlign: `left`}}>
                Built a Twitterbot that tweets out wine reviews for made up wines, powered by Markov chains.
            </P>
            <P style={{textAlign: `left`}}>
                Follow <a href="https://twitter.com/wectator" target="_blank">@wectator</a> to get a taste.
            </P>
            </Project>
        </Layout>
    )
}