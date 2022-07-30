import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import Idea from "../components/idea"
import P from "../components/paragraph"
import Hr from "../components/hr"
import { getIdeasData } from '../helpers/ideas.js'

import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';

import visit from "unist-util-visit"
import toString from "mdast-util-to-string"


// const ideasFileContents = fs.readFileSync('ideas/ideas.md');

// https://dev.to/jameswallis/how-to-use-the-remark-markdown-converters-with-next-js-projects-a8a
// Super nice way to use custom components ^
// const content = unified()
//     .use(parse)
//     .use(remark2react)
//     .processSync(ideasFileContents).result;

// const ideasMetaData = matter(ideasFileContents);


// https://github.com/vercel/next.js/blob/8b721227cf82a0af3be07663dc8d218430c80514/examples/blog-starter/lib/api.ts#L7

export default function Ideas ({ ideasData }) {
  console.log("IDEAS DATA")
  console.log(ideasData)

  // Walk through the hast and create a data structure to pass to a custom component
  /*
    Markdown format:

    # heading
    ### date
    Everthing else (until the next H1) is content and will be rendered to HTML in a standard way.
  */
//  var simplifiedMdContent = []
//  let idea = {}
//  console.log(data.markdownRemark.htmlAst)
//  visit(data.markdownRemark.htmlAst, node => {
//    // If we encounter a header, push the idea obj then create a new obj
//    if (node.tagName === "h1") {
//      // Exception: the first header should not be pushed
//      if (!(simplifiedMdContent.length === 0 && Object.keys(idea).length === 0)) {
//        simplifiedMdContent.push(idea)
//        idea = {}
//      }
//      idea.heading = toString(node)
//    }

//    // h3 must be the date
//    if (node.tagName === "h3") {
//      idea.date = toString(node)
//    }

//    // If we encounter a paragraph, add the node and its children to an array
//    if (node.tagName === "p" || node.tagName === "ul" || node.tagName === "ol") {
//      if ("content" in idea) {
//        idea.content.push(node)
//      } else {
//        idea.content = [node]
//      }
//    }
//  })
//  // When finished traversing the tree, push the remaining obj
//  simplifiedMdContent.push(idea)

  return (
    <Layout>
      <PageTitle>Ideas</PageTitle>
      {/* <div className="columns">
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
          {/*Walk through each "idea" and send the heading and content to a subcomponent 
          {simplifiedMdContent.map(idea => (
            <Idea heading={idea.heading} date={idea.date} paragraphs={idea.content} />
          ))}
        </div>
      </div> */}
    </Layout>
  )
}

export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    const ideasData = getIdeasData();
    // console.log("getStaticProps")
    // console.log(ideasData)
  
    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
      props: {
        ideasData,
      },
    };
  }

// export const query = graphql`
// query {
//   markdownRemark(fileAbsolutePath: {regex: "/ideas/"}) {
//     id
//     headings {
//       depth
//       value
//     }
//     htmlAst
//     rawMarkdownBody
//   }
// }
// `