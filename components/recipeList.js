import P from './paragraph'
import A from './anchor'
import Link from 'next/link'

import styles from './recipeList.module.css'

export default function RecipeList({ recipeData }) {
    const comingSoonRecipes = recipeData.filter(recipe => !recipe.slug);
    const availableRecipes = recipeData.filter(recipe => recipe.slug);

    return (
        <>
            <ul>
                {availableRecipes.map((recipe) => (
                    <li>
                        {recipe.slug ? (
                            <A href={`/recipes/${recipe.slug}`}> 
                                <P leftAlign>{recipe.title}</P>
                            </A>
                        ) : (
                            <P leftAlign>{recipe.title} [coming soon]</P>
                        )}
                    </li>
                ))}
            </ul>
            {comingSoonRecipes.length > 0 && (
                <>
                    <P style={{fontWeight: 'bold'}}>COMING SOON:</P>
                    <ul>
                        {comingSoonRecipes.map((recipe) => (
                            <li>
                                {recipe.slug ? (
                                    <A href={`/recipes/${recipe.slug}`}> 
                                        <P leftAlign>{recipe.title}</P>
                                    </A>
                                ) : (
                                    <P className={styles.comingSoon} leftAlign>{recipe.title}</P>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    )
}