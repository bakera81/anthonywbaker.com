import styles from './list.module.css'

export default function List({ ordered, children }) {
    console.log(children)
    return ordered ? (
        <ol className={styles.orderedList}>
            {children}
        </ol>
    ) : (
        <ul className={styles.unorderedList}>
            {children}
        </ul>
    )
}