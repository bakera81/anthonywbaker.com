import Layout from '../components/wedding/layout'
import ListLink from '../components/listlink'
import P from '../components/paragraph'
import Link from 'next/link'
import Image from "next/legacy/image"
import BackgroundImg from '../components/wedding/backgroundImg'

import styles from './wedding.module.css'

import img1 from '../public/images/wedding/candycorn.jpg'

export default function NYWedding() {
  // TODO: no-index
  return (
      <Layout title={'Wren & Anthony\'s Spooky Wedding'}>
        <div className={`columns ${styles.isReverseMobile}`}>
          <div className='column'>
            <div className='grid is-col-min-12 is-gap-0'>
              <div className={`cell ${styles.weddingCell}`}>
                <BackgroundImg img={img1}>
                  <Link href='/about' className={styles.weddingLink}>Wren</Link>
                </BackgroundImg>
              </div>
              <div className={`cell ${styles.weddingCell}`}>And</div>
              <div className={`cell ${styles.weddingCell}`}>Anthony</div>
              <div className={`cell ${styles.weddingCell}`}>Wedding</div>
            </div>
          </div>
          <div className='column'>
            <div className='section'>
              <div className='container'>
                <div className={`level ${styles.listLinkLevel}`}>
                  <ListLink href="/about">Wren</ListLink>
                  <ListLink href="/stories">and</ListLink>
                  <ListLink href="/projects">Anthony</ListLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <P>October 31, 2024</P>
          <P>9 Orchard Street, New York, New York</P>
          <P>Schedule | Moodboard</P>
        </div>
      </Layout> 
  )
}
