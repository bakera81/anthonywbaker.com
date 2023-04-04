import Link from 'next/link'
import styles from './ideaTitle.module.css'
// var GithubSlugger = require('github-slugger')
// var slugger = new GithubSlugger()


export default function StoryTitle({ children, slug }) {
    
    // const ideaId = slugger.slug(children[0])
    
    return (
        //  <a href={`/stories/${slug}`}>
        //     <h4 className={`title is-4 ${styles.heading}`}>{children}</h4>
        // </a>    
        // <Link id={ideaId} href={`/ideas#${ideaId}`} scroll={false}>
        //     <h4 className={`title is-4 ${styles.heading}`}>{children}</h4>
        // </Link>
        <Link href={slug} legacyBehavior>
            <h4 className={`title is-4 ${styles.heading}`}>{children}</h4>
        </Link>
    );
}