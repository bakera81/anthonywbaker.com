import Layout from '../../components/layout'
import IdeaTitle from '../../components/ideaTitle'
import P from '../../components/paragraph'
import List from '../../components/list'
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
    });

    return {
        paths,
        fallback: false,
    };
  }

export async function getStaticProps({ params }) {
    const recipe = await queryRecipesDatabase(params.id)
    // console.log({step: 'getStaticProps', recipe: recipe})
    return {
        props: {
            recipeData: recipe
        },
    };
}

export default function Recipe({ recipeData }) {
    return(
        <Layout title={recipeData.title}>
            {console.log(recipeData)}
            <ReactMarkdown
                components={{
                    h1: ({node, ...props}) => <IdeaTitle {...props} />,
                    p: ({node, ...props}) => <P style={{textAlign: `left`}} {...props} />,
                    ul: ({node, ...props}) => <List style={{textAlign: `left`}} {...props} />,
                    ol: ({node, ...props}) => <List ordered style={{textAlign: `left`}} {...props} />,
                }}
            >
                {recipeData.markdown}
            </ReactMarkdown>
        </Layout>
    )
}