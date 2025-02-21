import Layout from "../../components/layout"
import PageTitle from "../../components/pagetitle"
import P from "../../components/paragraph"
import HR from "../../components/hr"
import StoryTitle from "../../components/storyTitle"
import List from "../../components/list"
import MarkdownImage from "../../components/markdownImage"

import Link from "next/link"
import ReactMarkdown from "react-markdown"

import styles from "./stories.module.css"

import { getStoriesFromDatabase } from "../../utils/stories"

export async function getStaticProps() {
  const storiesData = await getStoriesFromDatabase()
  return {
    props: {
      storiesData,
    },
  }
}

export default function Stories({ storiesData }) {
  return (
    <Layout title="Stories">
      <PageTitle>Stories</PageTitle>
      <div className="columns">
        <div className="column is-6 is-offset-6">
          <P>
            <Link href="/stories/table-of-contents">Table of contents</Link>
          </P>
          <HR />
        </div> 
      </div>
    <div className="columns">
        <div className="column is-1-desktop is-hidden-touch"></div>
        <div className={`column is-two-thirds-desktop ${styles.mdContainer}`}>
          {storiesData.map((story) => (
            <>
              <StoryTitle slug={`/stories/${story.slug}`}>{story.title}</StoryTitle>
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
                {story.markdown.parent}
              </ReactMarkdown>
            </>
          ))}
        </div>
      </div>
    </Layout>
  )
}
