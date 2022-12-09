import Layout from '../../components/layout'
import P from '../../components/paragraph'
import ReactMarkdown from 'react-markdown'

import { getRecipesDatabase, queryRecipesDatabase } from '../../utils/recipes'

export async function getStaticPaths() {
    const recipesData = await getRecipesDatabase();
    const paths = recipesData.map((recipe) => {
        return {
            params: {
                id: recipe.slug,
            }
        }
    })

    // const paths2 = [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return {
    //   paths: paths,
        paths,
        fallback: false,
    };
  }

export async function getStaticProps({ params }) {
    // console.log({step: 'getStaticProps', params: JSON.stringify(params)})
    // const recipeData = await getRecipeData(params.id);
    // console.log('RECIPE DATA')
    // console.log(recipeData)
    const recipe = await queryRecipesDatabase(params.id)
    // console.log({step: 'getStaticProps', recipe: recipe})
    return {
        props: {
            recipeData: recipe
        },
    };
}

export default function Recipe({ recipeData }) {
    // return (<>{console.log(recipeData)}</>)
    return(
        <Layout title={recipeData.title}>
        <ReactMarkdown
            components={{
                p: ({node, ...props}) => <P style={{textAlign: `left`}} {...props} />,
            }}
        >
            {recipeData.markdown}
        </ReactMarkdown>
        
        </Layout>
    )
}