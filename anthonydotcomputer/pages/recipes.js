import Layout from  '../components/layout'
import PageTitle from '../components/pagetitle'
import P from '../components/paragraph'
import RecipeList from '../components/recipeList'

import styles from './recipes.module.css'

import { getRecipesData } from '../utils/recipes'


export async function getStaticProps() {
    const recipesData = getRecipesData();
    return {
      props: {
        recipesData,
      },
    };
}

export default function Recipes ({ recipesData }) {

  return (
    <Layout title="Recipes">
      <PageTitle>Recipes</PageTitle>
        <div className="section">
            <div className="columns">
                {recipesData.slice(0,2).map((category) => (
                    <div className="column is-6">
                        <h2 className={styles.recipeSection}>{category.category}</h2>
                        <RecipeList recipeData={category.data} />
                    </div>
                ))}
            </div>
        </div>
        <div className="section">
            <div className="columns">
                {recipesData.slice(2,4).map((category) => (
                    <div className="column is-6">
                        <h2 className={styles.recipeSection}>{category.category}</h2>
                        <RecipeList recipeData={category.data} />
                    </div>
                ))}
            </div>
        </div>                    
    </Layout>
  )
}