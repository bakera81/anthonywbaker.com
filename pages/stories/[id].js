import Layout from "../../components/layout"
import StoryTitle from "../../components/storyTitle"
import P from "../../components/paragraph"
import List from "../../components/list"
import HR from "../../components/hr"
import MarkdownImage from "../../components/markdownImage"
import Markdown from "../../components/markdown"

import Link from "next/link"

import {
  getStoriesFromDatabase,
  queryStoriesDatabase,
} from "../../utils/stories"

// import styles from "./stories.module.css"
import markdownStyles from '../../components/markdown.module.css'

export async function getStaticPaths() {
  const storiesData = await getStoriesFromDatabase()
  const paths = storiesData.map((story) => {
    return {
      params: {
        id: story.slug,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const story = await queryStoriesDatabase(params.id)
  // const titleArray = recipe.title.split('/')
  // titleArray.splice(1, 0, '/') // re-add the deliminiter.
  // console.log({step: 'getStaticProps', recipe: recipe})
  return {
    props: {
      storyData: {
        ...story,
      },
    },
  }
}

export default function IndividualStory({ storyData }) {
  return (
    <Layout title={storyData.title}>
      <div className="columns">
        <div className="column is-1-desktop is-hidden-touch"></div>
        <div className={`column is-two-thirds-desktop ${markdownStyles.mdContainer}`}>
          <StoryTitle slug={`/stories/${storyData.slug}`}>{storyData.title}</StoryTitle>
          <Markdown>
            {storyData.markdown.parent}
          </Markdown>
        </div>
      </div>
      <div className="columns">
        <div className="column is-6 is-offset-6">
          <HR />
          <P><Link href="/stories/table-of-contents">← Table of contents</Link></P>
          <P><Link href="/stories">← All stories</Link></P>
        </div> 
      </div>
    </Layout>
  )
}
