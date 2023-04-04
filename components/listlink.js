import Link from 'next/link'
import styles from './listlink.module.css'

export default function ListLink({ href, children }) {
    return (
        <div className={`level-item ${styles.levelItemStyle}`}>
            <Link href={ href } legacyBehavior>
                <h1 className={`title is-2 ${styles.listLinkStyle}`}>{children}</h1>
            </Link>
        </div>
    );
}