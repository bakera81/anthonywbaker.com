import styles from './paragraph.module.css'

export default function P ({ children, style }) {
    return (
        <p className={styles.paragraph} style={style}>{children}</p>
    )
}