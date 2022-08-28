import P from './paragraph'
import styles from './songTitle.module.css'


export default function SongTitle({ children, subtitle }) {
  return (
    <>
    <h3 className={`title is-2 ${styles.title}`}>{children}</h3>
    <P className={styles.subtitle} style={{textAlign: 'center'}}>{subtitle}</P>
    </>
  )
}