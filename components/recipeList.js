import P from './paragraph'
import A from './anchor'
import Link from 'next/link'

import styles from './recipeList.module.css'

export default function RecipeList({ recipeData }) {
    return (
        <ul>
            {recipeData.map((recipe) => (
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
    )
}