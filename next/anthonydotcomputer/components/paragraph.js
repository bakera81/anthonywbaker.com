import styles from './paragraph.module.css'

export default function P ({ children, leftAlign }) {
    return (
        <p className={leftAlign ? `${styles.paragraph} ${styles.leftAlign}` : styles.paragraph}>{children}</p>
    )
}