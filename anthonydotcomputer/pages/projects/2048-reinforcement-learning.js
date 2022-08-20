import Layout from '../../components/layout'
import Project from '../../components/project'
import P from '../../components/paragraph'


import projectImage from '../../public/images/projects/2048.png'

export const frontmatter = {
    title: 'Reinforcement Learning',
    description: 'Playing 2048 with reinforcement learning.',
    slug: '2048-reinforcement-learning',
    preview: projectImage,
    themeColor: '#edc53f',
    updatedAt: '2017-12-03',
    completed: true,
};

export default function ReinforcementLearning() {
  return(
    <Layout title={frontmatter.title}>
      <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
        <P style={{textAlign: `left`}}>
          Created an "environment" for the game <a href="https://play2048.co/">2048</a> using <a href="https://gym.openai.com/">Open AI Gym</a> to train various reinforcement learning algorithms to play the game.
        </P>
      </Project>
    </Layout>
  )
}