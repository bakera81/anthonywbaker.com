import styles from './paragraph.module.css'

// TODO: Have this pass through className
export default function P ({ children, style }) {
    return (
        <p className={styles.paragraph} style={style}>{children}</p>
    )
}