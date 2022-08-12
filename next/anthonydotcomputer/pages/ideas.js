import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import Idea from "../components/idea"
import P from "../components/paragraph"
import Hr from "../components/hr"
import Image from 'next/image'

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
              <P style={{textAlign: `left`}}>
                Inspired by "Today I Learned" blogs, these are ideas I've come across that seemed worth writing down.
              </P>
              <Hr />
            </div>
          </div>
          <div className="columns">
            <div className="column is-1-desktop is-hidden-touch"></div>
            <div className="column is-two-thirds-desktop">
                <ReactMarkdown
                    components={{
                        // Use custom components
                        h1: ({node, ...props}) => <PageTitle {...props} />,
                        hr: ({node, ...props}) => <Hr {...props} />,
                        p: ({node, ...props}) => <P {...props} />,
                        img: ({node, ...props}) => <Image width={200} height={200} {...props} />
                    }}
                >
                    {ideasData.content}
                </ReactMarkdown>
            </div>
          </div>
        </Layout>
    )
}