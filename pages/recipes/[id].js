import Layout from '../../components/layout'
import IdeaTitle from '../../components/ideaTitle'
import P from '../../components/paragraph'
import H2 from '../../components/h2'
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
            {/* {console.log("RECIPE DATA")}
            {console.log(recipeData)} */}
            {/* wrap all MD content in another section to provide more margin on the edgs of the page*/}
            <div className="section"> 
                <div className="content">
                    <H2>{recipeData.title}</H2>
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
                </div>
            </div>
        </Layout>
    )
}