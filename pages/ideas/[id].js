import Layout from "../../components/layout"
import StoryTitle from "../../components/storyTitle"
import P from "../../components/paragraph"
import H2 from "../../components/h2"
import List from "../../components/list"
import TickerTitle from "../../components/tickerTitle"
import HR from "../../components/hr"
import MarkdownImage from "../../components/markdownImage"

import ReactMarkdown from "react-markdown"
import Link from "next/link"

import { getIdeasFromDatabase, queryIdeasDatabase } from "../../utils/ideas"

import styles from './ideas.module.css'

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
        <div className={`column is-two-thirds-desktop ${styles.mdContainer}`}>
          <StoryTitle slug={`/ideas/${ideaData.slug}`}>{ideaData.title}</StoryTitle>
          <ReactMarkdown
            components={{
              // h1: ({node, ...props}) => <IdeaTitle {...props} />,
              p: ({ node, ...props }) => (
                <P style={{ textAlign: `left` }} {...props} />
              ),
              ul: ({ node, ...props }) => (
                <List style={{ textAlign: `left` }} {...props} />
              ),
              ol: ({ node, ...props }) => (
                <List ordered style={{ textAlign: `left` }} {...props} />
              ),
              img: ({ node, ...props }) => (
                <MarkdownImage src={props.src} {...props} />
              ),
            }}
          >
            {ideaData.markdown.parent}
          </ReactMarkdown>
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
