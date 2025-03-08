import styles from './paragraph.module.css'

export default function P ({ children, style, className }) {
    return (
        <p className={`${styles.paragraph} ${className ? className : ''}`} style={style}>{children}</p>
    )
}