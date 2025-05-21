import Layout from "../../components/layout"
import StoryTitle from "../../components/storyTitle"
import P from "../../components/paragraph"
import H2 from "../../components/h2"
import List from "../../components/list"
import TickerTitle from "../../components/tickerTitle"
import HR from "../../components/hr"
import MarkdownImage from "../../components/markdownImage"
import Markdown from "../../components/markdown"

import ReactMarkdown from "react-markdown"
import Link from "next/link"

import { getIdeasFromDatabase, queryIdeasDatabase } from "../../utils/ideas"

// import styles from './ideas.module.css'
import markdownStyles from '../../components/markdowncontainer.module.css'

export async function getStaticPaths() {
  const ideasData = await getIdeasFromDatabase()
  const paths = ideasData.map((idea) => {
    return {
      params: {
        id: idea.slug,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const idea = await queryIdeasDatabase(params.id)
  // console.log({step: 'getStaticProps', recipe: recipe})
  return {
    props: {
      ideaData: {
        ...idea,
      },
    },
  }
}

export default function IndividualIdea({ ideaData }) {
  return (
    <Layout canonicalHref={`https://anthony.computer/ideas/${ideaData.slug}`} title={ideaData.title}>
      <div className="columns">
        <div className="column is-1-desktop is-hidden-touch"></div>
        <div className={`column is-two-thirds-desktop ${markdownStyles.mdContainer}`}>
          <StoryTitle slug={`/ideas/${ideaData.slug}`}>{ideaData.title}</StoryTitle>
          <Markdown>{ideaData.markdown.parent}</Markdown>
        </div>
      </div>
      <div className="columns">
        <div className="column is-6 is-offset-6">
          <HR />
          <P>
            <Link href="/ideas">← All ideas</Link>
          </P>
          <P>
            <Link href="/ideas/table-of-contents">← Table of contents</Link>
          </P>
        </div>
      </div>
    </Layout>
  )
}
