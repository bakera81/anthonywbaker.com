import React from "react"

import { graphql, Link } from 'gatsby'
import styled from "@emotion/styled"

import Layout from  "../components/layout"
import PageTitle from "../components/pagetitle"
import P from "../components/paragraph"
import Container from "../components/container"
import RecipePreview from "../components/recipepreview"


const RecipeSection = styled.h2`
  font-family: Chomsky;
  font-size: 3rem !important;
  font-weight: normal;
  text-align: left;
`

const RecipeList = props => (
  <ul>
  {props.recipeData.map(({ node }) => (
    <li>
      <Link to={node.path}>
        <P style={{textAlign: `left`}}>{node.context.title}</P>
      </Link>
    </li>
  ))}
  </ul>
)

export default ({ data }) => {

  return (
    <Layout>
      <PageTitle>Recipes</PageTitle>
      <div className="section">
        <div className="columns">
          <div className="column is-6">
            <RecipeSection>Pasta</RecipeSection>
            <RecipeList recipeData={data.allSitePage.edges.filter(node => node.node.context.fileAbsolutePath.includes(`pasta`))} />
          </div>
          <div className="column is-6">
            <RecipeSection>Meat</RecipeSection>
            <RecipeList recipeData={data.allSitePage.edges.filter(node => node.node.context.fileAbsolutePath.includes(`meat`))} />
          </div>
        </div>
      </div>
      <div className="section">
        <div className="columns">
          <div className="column is-6">
            <RecipeSection>Salad</RecipeSection>
            <RecipeList recipeData={data.allSitePage.edges.filter(node => node.node.context.fileAbsolutePath.includes(`salad`))} />
          </div>
          <div className="column is-6">
            <RecipeSection>Other</RecipeSection>
            <RecipeList recipeData={data.allSitePage.edges.filter(node => node.node.context.fileAbsolutePath.includes(`other`))} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allSitePage(filter: {componentPath: {regex: "/templates/recipe.js/"}}) {
      edges {
        node {
          context {
            title
            slug
            fileAbsolutePath
          }
          path
          componentPath
        }
      }
    }
  }
`
