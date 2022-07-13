import Link from 'next/link'
import style from './listlink.module.css'

export default function ListLink({ href, children }) {
    return(
        <div className={`level-item ${style.levelItemStyle}`}>
            <Link href={ href }>
                <h1 className={`title is-2 ${style.listLinkStyle}`}>{children}</h1>
            </Link>
        </div>
    )
}