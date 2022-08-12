import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import IdeaTitle from "../components/ideaTitle"
import P from "../components/paragraph"
import Hr from "../components/hr"
import MarkdownImage from '../components/markdownImage'

import style from './ideas.module.css'

import ReactMarkdown from 'react-markdown'

import { getIdeasData } from '../helpers/ideas'


export async function getStaticProps() {
    const ideasData = getIdeasData();
    return {
      props: {
        ideasData,
      },
    };
}

export default function Ideas({ ideasData }) {
    return (
        <Layout>
          <PageTitle>Ideas</PageTitle>
          <div className="columns">
            <div className="column is-6 is-offset-6">
              <P>
                Inspired by "Today I Learned" blogs, these are ideas I've come across that seemed worth writing down.
              </P>
              <Hr />
            </div>
          </div>
          <div className="columns">
            <div className="column is-1-desktop is-hidden-touch"></div>
            <div className={`column is-two-thirds-desktop ${style.mdContainer}`}>
                <ReactMarkdown
                    // Exclude dates which are always h4's
                    disallowedElements={["h4"]}
                    components={{
                        // Use custom components
                        // h1: ({node, ...props}) => <PageTitle {...props} />,
                        h1: ({node, ...props}) => <IdeaTitle {...props} />,
                        h4: "",
                        hr: ({node, ...props}) => <Hr {...props} />,
                        p: ({node, ...props}) => <P leftAlign {...props} />,
                        // TODO: use markdown to set the height per image
                        img: ({node, ...props}) => <MarkdownImage {...props} />
                    }}
                >
                    {ideasData.content}
                </ReactMarkdown>
            </div>
          </div>
        </Layout>
    )
}