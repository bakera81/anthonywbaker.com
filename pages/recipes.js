import Layout from  '../components/layout'
import PageTitle from '../components/pagetitle'
import P from '../components/paragraph'
import RecipeList from '../components/recipeList'

import styles from './recipes.module.css'

import { getRecipeMarkdown, getBlocks, getRecipesDatabase, getRecipeCategories, getAllRecipesAndCategories, getRecipeBlocks } from '../utils/recipes'

// import { getRecipesData } from '../utils/recipes'


export async function getStaticProps() {
  // Interestingly this returns data...
  // const recipesData = await getBlocks(PAGE_ID);
  // ... but this does not...
  // const recipesData = await getRecipeMarkdown(PAGE_ID);
  // const recipesData = await getRecipeMarkdown(PAGE_ID)
  // ... and neither does this (for 'markdown')...
  const recipesData = await getRecipesDatabase();
  console.log('IN GET STATIC PROPS')
  console.log(recipesData)
  return {
    props: {
      recipesData,
    },
  };
}

export default function Recipes({ recipesData }) { 
  return (
    <>
      {console.log(recipesData)}
      {/* {recipesData.map((recipe) => (
        <p>{recipe.category}</p>
      ))} */}
    </>
  )
}

// export default function Recipes ({ recipesData }) {

//   return (
//     <Layout title="Recipes">
//       <PageTitle>Recipes</PageTitle>
//         <div className="section">
//             <div className="columns">
//                 {recipesData.slice(0,2).map((category) => (
//                     <div className="column is-6">
//                         <h2 className={styles.recipeSection}>{category.category}</h2>
//                         <RecipeList recipeData={category.data} />
//                     </div>
//                 ))}
//             </div>
//         </div>
//         <div className="section">
//             <div className="columns">
//                 {recipesData.slice(2,4).map((category) => (
//                     <div className="column is-6">
//                         <h2 className={styles.recipeSection}>{category.category}</h2>
//                         <RecipeList recipeData={category.data} />
//                     </div>
//                 ))}
//             </div>
//         </div>                    
//     </Layout>
//   )
// }