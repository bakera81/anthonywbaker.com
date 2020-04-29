import React from "react"

import styled from "@emotion/styled"

// import visit from "unist-util-visit"
import toString from "mdast-util-to-string"
import renderHastToReact from "../helpers/renderHastToReact"

import { graphql } from "gatsby"
import Layout from  "../components/layout"
import PageTitle from "../components/pagetitle"
import MdContainer from "../components/markdowncontainer"

/*Bulma-ify the content: <div className="content">*/
const RecipeList = props => (
  <MdContainer>
    {props.children}
  </MdContainer>
)

const H3 = styled.h3`
  text-align: center;
`

export default ({ data }) => {
  console.log(data.markdownRemark.htmlAst.children)
  // split the array of top-level children
  const isIngredients = element => element.tagName === "h1" && toString(element) === "Ingredients"
  const isInstructions = element => element.tagName === "h1" && toString(element) === "Instructions"
  const ingredientsIndex = data.markdownRemark.htmlAst.children.findIndex(isIngredients)
  const instructionsIndex = data.markdownRemark.htmlAst.children.findIndex(isInstructions)
  // order matters in the markdown:
  // 1. Ingredients
  // 2. Instructions
  console.log(ingredientsIndex)
  console.log(instructionsIndex)
  const ingredients = data.markdownRemark.htmlAst.children.slice(ingredientsIndex + 1, instructionsIndex)
  const instructions = data.markdownRemark.htmlAst.children.slice(instructionsIndex + 1)

  return (
    <Layout>
      <PageTitle>{data.markdownRemark.frontmatter.title}</PageTitle>
      <div class="columns">
        <div class="column">
          <H3 className="title is-3">Ingredients</H3>
          <RecipeList>{renderHastToReact({type: `root`, children: ingredients})}</RecipeList>
        </div>
        <div class="column">
          <H3 className="title is-3">Instructions</H3>
          <RecipeList>{renderHastToReact({type: `root`, children: instructions})}</RecipeList>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
query($fileAbsolutePath: String!) {
  markdownRemark(fileAbsolutePath: {eq: $fileAbsolutePath}) {
    frontmatter {
      title
    }
    htmlAst
    fileAbsolutePath
  }
}
`
