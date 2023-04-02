import Layout from '../components/layout'
import PageTitle from '../components/pagetitle'
import IdeaTitle from '../components/ideaTitle'
import P from '../components/paragraph'
import List from '../components/list'
import Hr from '../components/hr'
import MarkdownImage from '../components/markdownImage'

import styles from './ideas.module.css'

import ReactMarkdown from 'react-markdown'

import { getIdeasFromDatabase, downloadAllIdeasImages } from '../utils/ideas'


export async function getStaticProps() {
  const test = await downloadAllIdeasImages();
  const ideasData = await getIdeasFromDatabase();
  const ideasCategoryNestedArray = ideasData.map(idea => idea.category)
  const ideaCategories = [...new Set(ideasCategoryNestedArray.flat())]
  return {
    props: {
      ideasData,
      ideaCategories,
    },
  };
}


export default function Ideas({ ideasData, ideaCategories}) {

  return (
    <Layout title="Ideas">
      <PageTitle>Ideas</PageTitle>
      <div className="columns">
        <div className="column is-6 is-offset-6">
          <P>
            Inspired by "Today I Learned" blogs, these are ideas that seemed worth writing down.
          </P>
          <Hr />
        </div>
      </div>
      <div className="columns">
        <div className="column is-1-desktop is-hidden-touch"></div>
        <div className={`column is-two-thirds-desktop ${styles.mdContainer}`}>
          {ideasData.map((idea) => (
            <>
              <IdeaTitle slug={idea.slug}>{idea.title}</IdeaTitle>
              <ReactMarkdown
                components={{
                    // h1: ({node, ...props}) => <IdeaTitle {...props} />,
                    p: ({node, ...props}) => <P style={{textAlign: `left`}} {...props} />,
                    ul: ({node, ...props}) => <List style={{textAlign: `left`}} {...props} />,
                    ol: ({node, ...props}) => <List ordered style={{textAlign: `left`}} {...props} />,
                    img: ({node, ...props}) => <MarkdownImage src={props.src} {...props} />,
                }}
              >
                {idea.markdown}
              </ReactMarkdown>
            </>
          ))}
        </div>
      </div>
    </Layout>
  )
}