import styles from './hr.module.css'

export default function HR({ style }) {
    return (
        <hr 
            className={`has-background-grey-lighter ${styles.horizontalRule}`}
            style={style}
        />
    )
}