import Layout from  '../../components/layout'
import PageTitle from '../../components/pagetitle'
import P from '../../components/paragraph'
import RecipeList from '../../components/recipeList'

import styles from './categories.module.css'

import { getRecipesDatabase } from '../../utils/recipes'

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
    <Layout title="Recipes - Categories">
      <PageTitle>Recipes</PageTitle>
      {recipeCategories.map((category, i) => {
        if (i % 2 == 0) {
          return (
            <div className="section">
              <div className="columns">
                <div className="column is-6">
                  <h2 className={styles.recipeSection}>{recipeCategories[i]}</h2>
                  <RecipeList recipeData={
                    recipesData.filter((recipe) => {return recipe.category.includes(recipeCategories[i])})
                  } />
                </div>
                {/* TODO Don't render this column if there are no more categories */}
                <div className="column is-6">
                  <h2 className={styles.recipeSection}>{recipeCategories[i + 1]}</h2>
                  <RecipeList recipeData={
                    recipesData.filter((recipe) => {return recipe.category.includes(recipeCategories[i + 1])})
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