import styles from './pagetitle.module.css'


export default function ({ children }) {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className="level">
          <div className="level-right">
            <h1 className={`title is-1 ${styles.pageTitle}`}>{children}</h1>
          </div>
        </div>
      </div>
    </section>
  )
}