import Layout from '../../components/layout'
import P from '../../components/paragraph'
import ReactMarkdown from 'react-markdown'

import { getAllRecipeIds, getRecipeData } from '../../utils/recipes'
import { NotionToMarkdown } from 'notion-to-md'

export async function getStaticPaths() {
    const paths = await getAllRecipeIds();
    console.log('get Paths:')
    console.log(paths)
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
    const recipeData = await getRecipeData(params.id);
    console.log('RECIPE DATA')
    console.log(recipeData)
    return {
        props: {
            recipeData,
        },
    };
}

export default function Recipe({ recipeData }) {
    console.log(recipeData)
    return(
        <Layout title={recipeData.title}>
        <ReactMarkdown>
            {recipeData.markdown}
        </ReactMarkdown>
        
        </Layout>
    )
}