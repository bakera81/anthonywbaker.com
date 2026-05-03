import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import Markdown from "../components/markdown"

import Image from "next/legacy/image"

import babyImg from '../public/images/justus_sustermans_portrait_of_cosimo_iii_de_medici_as_baby.webp'
import titleStyles from '../components/pagetitle.module.css'

import {
  getMarkdown,
} from "../utils/notionHelpers"

import markdownStyles from '../components/markdown.module.css'

export async function getStaticProps() {
  const pageId = process.env.NOTION_VISITING_BABY_PAGE_ID
  const markdown = await getMarkdown(pageId)
  
  return {
    props: {
      visitingBabyData: {
        title: "Visiting Habibi",
        markdown: markdown,
      },
    },
  }
}

export default function VisitingBaby({ visitingBabyData }) {
  return (
    <Layout home={true} title={visitingBabyData.title} noindex={true}>
    <h1 className={`title is-1 has-text-centered ${titleStyles.pageTitle}`}>{visitingBabyData.title}</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <Image
          src={babyImg}
          width={400}
          height={Math.round((400 * babyImg.height) / babyImg.width)}
          alt="Baby portrait"
        />
      </div>
      <div className="columns">
        <div className="column is-1-desktop is-hidden-touch"></div>
        <div className={`column is-two-thirds-desktop ${markdownStyles.mdContainer}`}>
          <Markdown>
            {visitingBabyData.markdown.parent}
          </Markdown>
        </div>
      </div>
      {/* <div className="columns">
        <div className="column is-6 is-offset-6">
          <HR />
          <P><Link href="/">← Home</Link></P>
        </div> 
      </div> */}
    </Layout>
  )
}
