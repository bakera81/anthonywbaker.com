import Layout from  '../components/layout'
import PageTitle from '../components/pagetitle'
import P from '../components/paragraph'
import Link from 'next/link'
import RecipeList from '../components/recipeList'

// import styles from './recipes.module.css'

import { getRecipesDatabase } from '../utils/recipes'

// import { getRecipesData } from '../utils/recipes'


export async function getStaticProps() {
  const recipesData = await getRecipesDatabase();
  const recipeCategoryNestedArray = recipesData.map(recipe => recipe.category)
  const recipeCategories = [...new Set(recipeCategoryNestedArray.flat())]
  return {
    props: {
      recipesData,
      recipeCategories,
    },
  };
}


export default function Recipes({ recipesData, recipeCategories }) {
  return (
    <Layout title="Recipes">
      <PageTitle>Recipes</PageTitle>
      <P> or <Link href="/recipes/categories">browse by category</Link></P>
    </Layout>
  )
}