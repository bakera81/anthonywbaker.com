import Layout from '../../components/layout'
import Project from '../../components/project'
import P from '../../components/paragraph'

import projectImage from '../../public/images/projects/djsplattermommy.png'

export const frontmatter = {
  title: 'Farming Twitter Followers',
  description: 'Farming Twitter followers.',
  slug: 'follower-farming',
  preview: projectImage,
  themeColor: 'rgb(35, 98, 79)',
  updatedAt: '2014-01-01',
  completed: true,
}

export default function SplatterMommy() {
    return (
        <Layout title={frontmatter.title}>
            <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
            <P style={{textAlign: `left`}}>
                Wrote scripts to gain followers by selectively following and unfollowing users (<a href="https://twitter.com/hashtag/TeamFollowBack?src=hashtag_click" target="_blank">#teamfollowback</a>). Reached over 900 followers in two weeks. The account tweeted contemporary rap lyrics set to images of Maoist baby propaganda.
            </P>
            </Project>
        </Layout>
    )
}