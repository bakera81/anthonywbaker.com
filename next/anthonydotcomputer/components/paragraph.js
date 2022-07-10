import styles from './paragraph.module.css'

export default function P ({ children }) {
    return (
        <p className={styles.paragraph}>{children}</p>
    )
}