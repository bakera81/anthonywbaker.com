import P from './paragraph'
import Link from 'next/link'

import styles from './recipeList.module.css'

export default function RecipeList({ recipeData }) {
    return (
        <ul>
            {recipeData.map((recipe) => (
                <li>
                    <Link href={recipe.slug}> 
                        <P leftAlign>{recipe.title} <span className={styles.comingSoon}>[coming soon]</span></P>
                    </Link>
                </li>
            ))}
        </ul>
    )
}