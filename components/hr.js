import styles from './hr.module.css'

export default function HR() {
    return (
        <hr className={`has-background-grey-lighter ${styles.horizontalRule}`}/>
    )
}