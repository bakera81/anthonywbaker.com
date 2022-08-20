import Layout from '../../components/layout'
import Project from '../../components/project'
import P from '../../components/paragraph'

import projectImage from '../../public/images/projects/ml-shakespeare-2.png'

export const frontmatter = {
  title: 'Machine Learning Shakespeare Remix',
  description: 'Machine learning shakespeare remix.',
  slug: 'ml-shakespeare-remix',
  preview: projectImage,
  themeColor: 'rgb(5, 6, 13)',
  updatedAt: '2015-10-01',
  completed: true,
}

export default function MlShakespeare() {
    return (
        <Layout title={frontmatter.title}>
            <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
            <P style={{textAlign: `left`}}>
                I wrote a machine-learning algorithm that generated text that read and felt like Shakespeare, although it didn’t necessarily make sense. Inspired by <a href="https://github.com/xnomagichash/hacklab-ml" target="_blank">Brendan Kohler's code</a>, my algorithm read in all of Shakespeare’s collected works, then used Markov chains choose pairs of words probabilistically.
            </P>
            <P style={{textAlign: `left`}}>
                The work was presented in response to Walter Benjamin’s <a href="https://www.amazon.com/Work-Art-Age-Mechanical-Reproduction/dp/1453722483" target="_blank">"The Work of Art in the Age of Mechanical Reproduction."</a>
            </P>
            </Project>
        </Layout>
    )
}