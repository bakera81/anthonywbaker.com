import Layout from '../../components/layout'
import IdeaTitle from '../../components/ideaTitle'
import P from '../../components/paragraph'
import H2 from '../../components/h2'
import List from '../../components/list'
import TickerTitle from '../../components/tickerTitle'
import HR from '../../components/hr'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

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
            recipeData: {
                ...recipe,
            }
        },
    };
}

export default function Recipe({ recipeData }) {
    return(
        <Layout title={recipeData.title}>
            {/* {console.log("RECIPE DATA")}
            {   (recipeData)} */}
            {/* wrap all MD content in another section to provide more margin on the edgs of the page*/}
            <div className="section"> 
                <div className="content">
                    <TickerTitle>
                        <H2>{recipeData.introTitle}</H2>
                        <H2> / </H2>
                        <H2>{recipeData.title}</H2>
                    </TickerTitle>
                    <hr/>
                    <ReactMarkdown
                        components={{
                            h1: ({node, ...props}) => <IdeaTitle {...props} />,
                            p: ({node, ...props}) => <P style={{textAlign: `left`}} {...props} />,
                            ul: ({node, ...props}) => <List style={{textAlign: `left`}} {...props} />,
                            ol: ({node, ...props}) => <List ordered style={{textAlign: `left`}} {...props} />,
                        }}
                    >
                        ## Introduction   
                    </ReactMarkdown>
                    <ReactMarkdown
                        components={{
                            h1: ({node, ...props}) => <IdeaTitle {...props} />,
                            p: ({node, ...props}) => <P style={{textAlign: `left`}} {...props} />,
                            ul: ({node, ...props}) => <List style={{textAlign: `left`}} {...props} />,
                            ol: ({node, ...props}) => <List ordered style={{textAlign: `left`}} {...props} />,
                        }}
                    >
                        {recipeData.introMarkdown}
                    </ReactMarkdown>
                    <ReactMarkdown
                        components={{
                            h1: ({node, ...props}) => <IdeaTitle {...props} />,
                            p: ({node, ...props}) => <P style={{textAlign: `left`}} {...props} />,
                            ul: ({node, ...props}) => <List style={{textAlign: `left`}} {...props} />,
                            ol: ({node, ...props}) => <List ordered style={{textAlign: `left`}} {...props} />,
                        }}
                    >
                        {recipeData.recipeMarkdown}
                    </ReactMarkdown>
                </div>
            </div>
            <div className="columns">
                <div className="column is-6 is-offset-6">
                    <HR />
                    <P><Link href="/recipes">← All recipes</Link></P>
                </div> 
            </div>
        </Layout>
    )
}