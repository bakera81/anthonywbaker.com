import styles from './h2.module.css'

export default function H2({ children }) {
    
    return(
        <h2 className={`title is-2 ${styles.heading}`}>{children}</h2>
    )
}