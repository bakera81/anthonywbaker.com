import Layout from '../components/layout'
import PageTitle from '../components/pagetitle'
import SkillTitle from '../components/skillTitle'
import P from '../components/paragraph'
import List from '../components/list'
import MarkdownImage from '../components/markdownImage'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

import { getMarkdown } from '../utils/notionHelpers'


export async function getStaticProps() {
  const skillsMarkdown = await getMarkdown('1cdc4aa14327806d9fa5d995fedd7645');
  return {
    props: {
      skillsMarkdown
    }
  }
}

export default function Skills({ skillsMarkdown }) {
  return (
    <Layout title = "Skills">
      <PageTitle>Skills</PageTitle>
      {/* <div id="mdcontainer" style={textAlign: `left`}> */}
      <ReactMarkdown
        components={{
          h2: ({node, ...props}) => <SkillTitle {...props} />,
          p: ({node, ...props}) => <P style={{textAlign: `right`}} {...props} />,
          ul: ({node, ...props}) => <List style={{listStyle: `inside`}} {...props} />,
          ol: ({node, ...props}) => <List ordered style={{textAlign: `right`}} {...props} />,
          img: ({node, ...props}) => <MarkdownImage src={props.src} {...props} />,
        }}
      >
        {skillsMarkdown.parent}
      </ReactMarkdown>
      <div class="section">
        <Link style={{fontStyle: `italic`}} href="/contact">Want to work together?</Link>
      </div>
      {/* </div> */}
    </Layout>
  )
}