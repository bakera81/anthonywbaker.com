import styles from './list.module.css'

export default function List({ ordered, style, children }) {
    return ordered ? (
        // TODO: add listFont style
        <ol className={`${styles.orderedList} ${styles.listFont}`} style={style}>
            {children}
        </ol>
    ) : (
        <ul className={`${styles.unorderedList} ${styles.listFont}`} style={style}>
            {children}
        </ul>
    )
}