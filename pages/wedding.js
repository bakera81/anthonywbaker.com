import Layout from '../components/layout'
import ListLink from '../components/listlink'
import P from '../components/paragraph'

import styles from './index.module.css'

export default function NYWedding() {
  return (
      <Layout home>
        <div className={`level ${styles.listLinkLevel}`}>
          <ListLink href="/about">Wren</ListLink>
          <ListLink href="/stories">and</ListLink>
          <ListLink href="/projects">Anthony</ListLink>
        </div>
        <div className="container">
          <P>October 31, 2024</P>
          <P>9 Orchard Street, New York, New York</P>
          <P>Schedule | Moodboard</P>
        </div>
      </Layout> 
  )
}
