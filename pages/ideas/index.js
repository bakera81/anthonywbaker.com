import Layout from '../../components/layout'
import PageTitle from '../../components/pagetitle'
import StoryTitle from '../../components/storyTitle'
import P from '../../components/paragraph'
import List from '../../components/list'
import Hr from '../../components/hr'
import MarkdownImage from '../../components/markdownImage'
import Markdown from '../../components/markdown'

import Link from 'next/link'

import { getIdeasFromDatabase, downloadAllIdeasImages } from '../../utils/ideas'

// import styles from './ideas.module.css'
import markdownStyles from '../../components/markdown.module.css'

export async function getStaticProps() {
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
    <Layout canonicalHref={'https://anthony.computer/ideas'} title="Ideas">
      <PageTitle>Ideas</PageTitle>
      <div className="columns">
        <div className="column is-6 is-offset-6">
          <P>
            Inspired by "Today I Learned" blogs, these are ideas that seemed worth writing down.
          </P>
          <P><Link href="/ideas/table-of-contents">Table of contents</Link></P>
          <Hr />
        </div>
      </div>
      <div className="columns">
        <div className="column is-1-desktop is-hidden-touch"></div>
        <div className={`column is-two-thirds-desktop ${markdownStyles.mdContainer}`}>
          {ideasData.map((idea) => (
            <>
              <StoryTitle slug={`/ideas/${idea.slug}`}>{idea.title}</StoryTitle>
              <Markdown>
                {idea.markdown.parent}
              </Markdown>
              <Hr style={{marginLeft: 0, marginRight: 'auto'}}/> 
            </>
          ))}
        </div>
      </div>
    </Layout>
  )
}