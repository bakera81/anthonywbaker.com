import Layout from "../../components/layout"
import PageTitle from "../../components/pagetitle"
import P from "../../components/paragraph"
import HR from "../../components/hr"
import StoryTitle from "../../components/storyTitle"
import List from "../../components/list"
import MarkdownImage from "../../components/markdownImage"
import Markdown from "../../components/markdown"

import Link from "next/link"

// import styles from "./stories.module.css"
import markdownStyles from "../../components/markdown.module.css"

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
        <div className={`column is-two-thirds-desktop ${markdownStyles.mdContainer}`}>
          {storiesData.map((story) => (
            <>
              <StoryTitle slug={`/stories/${story.slug}`}>{story.title}</StoryTitle>
              <Markdown>
                {story.markdown.parent}
              </Markdown>
            </>
          ))}
        </div>
      </div>
    </Layout>
  )
}
