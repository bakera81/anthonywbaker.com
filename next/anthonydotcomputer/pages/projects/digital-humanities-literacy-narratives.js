import Layout from '../../components/layout'
import Project from '../../components/project'
import P from '../../components/paragraph'

import projectImage from '../../public/images/projects/research-tool.png'
import previewImage from '../../public/images/projects/research-tool-3.png'

export const frontmatter = {
  title: 'Literacy Data Research Tool',
  description: 'Literacy data research tool.',
  slug: 'digital-humanities-literacy-narratives',
  previewImage: previewImage,
  themeColor: '#b1cb73', // #83dedd
  backgroundColor: '#b1cb73', // #83dedd
  updatedAt: '2015-05-01',
  completed: true,
}

export default function LiteracyNarratives(){
    return(
        <Layout title={frontmatter.title}>
        <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
          <P style={{textAlign: `left`}}>
            Since 1987, Lafayette's <a href="https://cwp.lafayette.edu/" target="_blank">College Writing Program</a> has required every writing tutor to write a personal essay about their history as a writer.
            This corpus of student writing is an incredibly valuable research dataset—if you can access it easily. For example, a research question my team was interested in is "How has the shift from writing with pen and paper to writing digitally shaped the way students think about their own writing process?"
          </P>
          <P style={{textAlign: `left`}}>
            As part of a Digital Humanities initiative, I digitized thousands of writing samples and built a web application that could execute complex Boolean queries, perform statistical analysis on 20 years of student writing samples, and provide several customizable viewing options for the data.
          </P>
        </Project>
      </Layout>
    )
}