import React from "react"

import { css } from "@emotion/core"
import styled from "@emotion/styled"

import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import Idea from "../components/idea"
import P from "../components/paragraph"
import Hr from "../components/hr"

import visit from "unist-util-visit"
import toString from "mdast-util-to-string"




export default ({ data }) => {

  // Walk through the hast and create a data structure to pass to a custom component
  /*
    Markdown format:

    # heading
    ### date
    Everthing else (until the next H1) is content and will be rendered to HTML in a standard way.
  */
 var simplifiedMdContent = []
 let idea = {}
 visit(data.markdownRemark.htmlAst, node => {
   // If we encounter a header, push the idea obj then create a new obj
   if (node.tagName == "h1") {
     // Exception: the first header should not be pushed
     if (!(simplifiedMdContent.length == 0 && Object.keys(idea).length == 0)) {
       simplifiedMdContent.push(idea)
       idea = {}
     }
     idea.heading = toString(node)
   }

   // h2 must be the date
   if (node.tagName == "h3") {
     idea.date = toString(node)
   }

   // If we encounter a paragraph, add the node and its children to an array
   if (node.tagName == "p") {
     if ("content" in idea) {
       idea.content.push(node)
     } else {
       idea.content = [node]
     }
   }
 })
 // When finished traversing the tree, push the remaining obj
 simplifiedMdContent.push(idea)

 // console.log(simplifiedMdContent)
  return (
    <Layout>
      <PageTitle>Ideas</PageTitle>
      <div className="columns">
        <div className="column is-6 is-offset-6">
          <P style={{textAlign: `left`}}>
            These are big ideas I’ve come across that seemed important to me at the time.
            All of them, to some extent, were “lightbulb moments” for me when I first heard of them.
            Inspired by “Today I Learned” blogs, there is a pretty big range of what is included here:
            these ideas have shaped how I do my job and how I see the world; they are small tidbits that seem cool; they border on life philosophies...
            To me, they all seemed to strike upon a truth—big or small.
          </P>
          <Hr />
        </div>
      </div>
      <div className="columns">
        <div className="column is-three-quarters">
          {/*Walk through each "idea" and send the heading and content to a subcomponent */}
          {simplifiedMdContent.map(idea => (
            <Idea heading={idea.heading} date={idea.date} paragraphs={idea.content} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
query {
  markdownRemark(fileAbsolutePath: {regex: "/ideas/"}) {
    id
    headings {
      depth
      value
    }
    htmlAst
    rawMarkdownBody
  }
}
`
