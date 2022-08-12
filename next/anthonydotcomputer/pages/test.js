import Layout from '../components/layout'
import A from '../components/anchor'
import PageTitle from  '../components/pagetitle'
import P from '../components/paragraph'
import Hr from '../components/hr'
import Header from '../components/header'

import ReactMarkdown from 'react-markdown'

import { testGetIdeasData } from '../helpers/test'

import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { stringify } from 'rehype-stringify';
import { createElement, Fragment } from 'react'

export async function getStaticProps() {
    const testIdeasData = testGetIdeasData();
    return {
      props: {
        testIdeasData,
      },
    };
  }

export default function Test({ testIdeasData }) {
  return (
    <>
    <Header>About</Header>
    <Layout>
      <PageTitle>Test</PageTitle>
        <div>{testIdeasData.date}</div>
        {console.log("TEST IDEAS DATA")}
        {console.log(testIdeasData)}
        <ReactMarkdown
            components={{
                // Use a component instead of hrs
                h1: ({node, ...props}) => <PageTitle {...props} />
              }}
        >{testIdeasData.content}</ReactMarkdown>
        {/* {console.log(unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeReact, {
            createElement, Fragment,
            // components: {
            //     a: A,
            //     p: P,
            //   }
        })
        // .use(stringify)
        .processSync(testIdeasData.content))} */}
    </Layout>
    </>
  );
}