import styles from './list.module.css'

export default function List({ ordered, children }) {
    return ordered ? (
        // TODO: add listFont style
        <ol className={`${styles.orderedList} ${styles.listFont}`}>
            {children}
        </ol>
    ) : (
        <ul className={`${styles.unorderedList} ${styles.listFont}`}>
            {children}
        </ul>
    )
}