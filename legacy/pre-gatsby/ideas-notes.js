import React from "react"

import { css } from "@emotion/core"
import styled from "@emotion/styled"

import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"
import Layout from "../components/layout"
import PageTitle from "../components/pagetitle"
import Idea from "../components/idea"
import P from "../components/paragraph"

import sluggify from "../helpers/sluggify"

import hastToHyperscript from "hast-to-hyperscript"

const markdownContainer = styled.div`

`

const visit = require("unist-util-visit")
var remark = require("remark")
const toString = require("mdast-util-to-string")

const PWrapper = props => {
  console.log(`PWrapper Props: ${props}`)
    return React.createElement(P, {}, props)
  // if (props == `p`) {
  //   return React.createElement(P, {}, props)
  // } else {
  //   return React.createElement
  // }

}

const renderHtmlToReact = node => {
  console.log(`renderHtmlToReact Node:`)
  console.log(node)
  if (node.tagName == "p") {
    return hastToHyperscript(PWrapper, node);
  } else {
      return hastToHyperscript(React.createElement, node);
  }
};





export default ({ data }) => {
  const elements = data.markdownRemark.htmlAst.children.filter(child => child.type == "element")
  // console.log(elements)
  // var tree = remark().parse(data.markdownRemark.htmlAst)
  // var tree = remark().parse(elements)
  // var tree = remark()
  //   .use(remark2rehype)
  //   .parse("Some _emphasis_, **importance**, and `code`.")
  // var tree = remark().parse(data.markdownRemark.rawMarkdownBody)
  // console.log(tree)
  //  visit(tree, "text", node => {
  //   console.log(node)
  // })


  var unified = require('unified')
  var markdown = require('remark-parse')
  var remark2rehype = require('remark-rehype')
  // var doc = require('rehype-document')
  var format = require('rehype-format')
  var html = require('rehype-stringify')
  // var report = require('vfile-reporter')
  var h = require('hastscript')
  var toHast = require('mdast-util-to-hast')

/* https://michal.miskernik.sk/2018-12-16-rendering-html-in-gatsby/
      https://reactarmory.com/guides/learn-react-by-itself/custom-react-elements
  */

////////////////////////////////////////
// These functions were used to render elements inside an `idea` component that I defined
  const PWrapper = (name, attrs, children) => {
    console.log(`PWrapper: ${name}`)
    console.log(attrs)
    console.log(children)
    // https://reactarmory.com/guides/learn-react-by-itself/custom-react-elements
    // if (name == `p`) {
    //   return createFiniteElements
    // }
    let renderedChildren = unified()
      .use(format)
      .use(html)
      .stringify(children)

    return React.createElement(P, {dangerouslySetInnerHTML: { __html: renderedChildren }}, children)
  }

  const renderP = node => {

  }

  const renderHtmlToReact = node => {
    console.log(`renderHtmlToReact Node:`)
    console.log(node)
    if (node.tagName == "p") {
      // https://github.com/syntax-tree/hast-to-hyperscript
      // return hastToHyperscript(PWrapper, node);
      return React.createElement(P, {dangerouslySetInnerHTML: { __html: toString(node) }})
    } else {
      return hastToHyperscript(React.createElement, node);
    }
  };

////////////////////////////////////////

  // var tree =  h('h1', 'Hello world!')
//  var tree = remark()
    // .use(format)
    // .use(remark2rehype)
//    .parse("Some _emphasis_, **importance**, and `code`.")

  // var tree = data.markdownRemark.htmlAst

  // console.log(tree)
  // console.log("hast:")
  // console.log(toHast(tree))
  // const htmlTest = unified()
    // .use(markdown)
    // .use(remark2rehype)
    // .use(format)
    // .use(html)
    // .stringify(toHast(tree))
    // .process('# Hello world!', function(err, file) {
    // .process(data.markdownRemark.rawMarkdownBody, function(err, file) {
    // .process(tree, function(err, file) {
    //   console.log(String(file))
    // })

  // console.log(htmlTest)

  // Walk through the hast and create a data structure to pass to a custom component
 var simplifiedMdContent = []
 let idea = {}
 visit(data.markdownRemark.htmlAst, node => {
   // console.log("node:")
   // console.log(node)
   // console.log("idea:")
   // console.log(idea)
   // If we encounter a header, push the idea obj then create a new obj
   if (node.tagName == "h1") {
     // Exception: the first header should not be pushed
     // console.log(`contentLength: ${simplifiedMdContent.length}  objectKeys: ${Object.keys(idea).length}`)
     if (!(simplifiedMdContent.length == 0 && Object.keys(idea).length == 0)) {
       simplifiedMdContent.push(idea)
       idea = {}
     }
     idea.heading = toString(node)
   }

   // If we encounter a paragraph, render its children to HTML and add it to an array
   if (node.tagName == "p") {
     // node.tagName = "Paragraph"
     if ("content" in idea) {

       idea.content.push(
         node
        //  unified()
        //   .use(format)
        //   .use(html)
        //   .stringify(node)
        )
     } else {
       idea.content = [
         node
         // unified()
         //  .use(format)
         //  .use(html)
         //  .stringify(node)
       ]
     }
   }
 })

 // When finished traversing the tree, push the final obj
 simplifiedMdContent.push(idea)

 console.log(simplifiedMdContent)
  return (
    <Layout>
      <PageTitle>Ideas</PageTitle>
      <p>{JSON.stringify(simplifiedMdContent)} </p>
      {/*renderHtmlToReact(data.markdownRemark.htmlAst)*/}

      {simplifiedMdContent.map(idea => (
        <Idea heading={idea.heading} paragraphs={idea.content} />
      ))}
    </Layout>
  )
}

export const query = graphql`
query {
  markdownRemark(fileAbsolutePath: {regex: "/ideas/"}) {
    id
    frontmatter {
      date
      title
    }
    headings {
      depth
      value
    }
    htmlAst
    rawMarkdownBody
  }
}
`
