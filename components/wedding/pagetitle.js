import styles from './pagetitle.module.css'


export default function ({ children }) {
  return (
    <section className={`section`}>
      <div className="container">
        {/* <div className="level"> */}
          {/* <div className="level-right"> */}
            <h1 className={`title is-2 is-size-3-touch ${styles.pageTitle}`}>{children}</h1>
          {/* </div> */}
        {/* </div> */}
      </div>
    </section>
  )
}