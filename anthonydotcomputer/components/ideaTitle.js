import styles from './ideaTitle.module.css'
// import Link from 'next/link'
var GithubSlugger = require('github-slugger')
var slugger = new GithubSlugger()


export default function IdeaTitle({ children }) {
    
    const ideaId = slugger.slug(children[0])
    
    return(
        <a id={ideaId} href={`/ideas#${ideaId}`}>
            <h4 className={`title is-4 ${styles.heading}`}>{children}</h4>
        </a>    
        // <Link id={ideaId} href={`/ideas#${ideaId}`} scroll={false}>
        //     <h4 className={`title is-4 ${styles.heading}`}>{children}</h4>
        // </Link>
    )
}