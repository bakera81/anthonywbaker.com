import Layout from  '../components/layout'
import PageTitle from '../components/pagetitle'
import P from '../components/paragraph'
import RecipeList from '../components/recipeList'

import styles from './recipes.module.css'

import { getRecipeMarkdown, getBlocks, getRecipesDatabase, getRecipeCategories, getAllRecipesAndCategories, getRecipeBlocks } from '../utils/recipes'

// import { getRecipesData } from '../utils/recipes'


export async function getStaticProps() {
  const recipesData = await getRecipesDatabase();
  const recipeCategories = [...new Set(recipesData.map(recipe => recipe.category))]
  console.log(recipeCategories)
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
      {recipeCategories.map((category, i) => {
        if (i % 2 == 0) {
          return (
            <div className="section">
              <div className="columns">
                <div className="column is-6">
                  <h2 className={styles.recipeSection}>{recipeCategories[i]}</h2>
                  <RecipeList recipeData={
                    recipesData.filter((recipe) => {return recipe.category == recipeCategories[i]})
                  } />
                </div>
                {/* TODO Don't render this column if there are no more categories */}
                <div className="column is-6">
                  <h2 className={styles.recipeSection}>{recipeCategories[i + 1]}</h2>
                  <RecipeList recipeData={
                    recipesData.filter((recipe) => {return recipe.category == recipeCategories[i + 1]})
                  } />
                </div>
              </div>
            </div>
          )
        }
      })}
    </Layout>
  )
}