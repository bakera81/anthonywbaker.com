import Layout from  '../../components/layout'
import PageTitle from '../../components/pagetitle'
import P from '../../components/paragraph'
import RecipeList from '../../components/recipeList'

import styles from './categories.module.css'

import { getRecipesDatabase } from '../../utils/recipes'


export async function getStaticProps() {
  debugger;
  const recipesData = await getRecipesDatabase();
  const recipeCategoryNestedArray = recipesData.map(recipe => recipe.category)
  const recipeCategories = [...new Set(recipeCategoryNestedArray.flat())]
  const recipeTagsNestedArray = recipesData.map(recipe => recipe.tags)
  const recipeTags = [...new Set(recipeTagsNestedArray.flat())]
  // const recipeCategoriesAndTags = recipeCategories.concat(recipeTags)
  const recipesByCat = recipeCategories.map((category) => {
    const recipes = recipesData.filter((recipe) => {return recipe.category.includes(category)})
    return {
      grouping: category,
      groupingType: 'category',
      recipes: recipes,
    }
  })
  const recipesByTag = recipeTags.map((tag) => {
    const recipes = recipesData.filter((recipe) => {return recipe.tags.includes(tag)})
    return {
      grouping: tag,
      groupingType: 'tag',
      recipes: recipes,
    }
  })
  const recipesByCategoryAndTag = recipesByCat.concat(recipesByTag)
  return {
    props: {
      recipesByCategoryAndTag
    },
  };
}


export default function Recipes({ recipesByCategoryAndTag }) {
  return (
    <Layout title="Recipes">
      <PageTitle>Recipes</PageTitle>
      {recipesByCategoryAndTag.map((recipeObj, i) => {
        if (i % 2 == 0) {
          return (
            <div className="section">
              <div className="columns">
                <div className="column is-6">
                  <h2 className={styles.recipeSection}>{recipesByCategoryAndTag[i].grouping}</h2>
                  <RecipeList recipeData={recipeObj.recipes} />
                </div>
                {/* TODO Don't render this column if there are no more categories */}
                <div className="column is-6">
                  {recipesByCategoryAndTag[i + 1] ? 
                  <>
                    <h2 className={styles.recipeSection}>{recipesByCategoryAndTag[i + 1].grouping}</h2>
                    <RecipeList recipeData={recipesByCategoryAndTag[i + 1].recipes} />
                    </>
                   :
                  <></>
                  }
                </div>
              </div>
            </div>
          )
        }
      })}
    </Layout>
  )
}