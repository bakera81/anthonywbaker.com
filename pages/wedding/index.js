import Layout from '../../components/wedding/layout'
import ListLink from '../../components/listlink'
import P from '../../components/paragraph'
import Link from 'next/link'
import Image from "next/legacy/image"
import BackgroundImg from '../../components/wedding/backgroundImg'

import styles from './index.module.css'

import receptionImg from '../../public/images/wedding/lambs_room.jpg'
import threeWitchesImg from '../../public/images/wedding/three_witches.jpg'
import bat1Img from '../../public/images/wedding/bat1.jpg'
import eye1Img from '../../public/images/wedding/eye1.jpg'
import hairdresser from '../../public/images/wedding/hairdresser.jpg'
import nineOrchardImg from '../../public/images/wedding/nine_orchard.jpg'
import superiority1Img from '../../public/images/wedding/superiority1.jpg'

export default function NYWedding() {
  // TODO: no-index
  return (
      <Layout title={'Wren & Anthony\'s Spooky Wedding'}>
        <div className={`columns ${styles.isReverseMobile}`}>
          <div className='column is-two-thirds'>
            <div className='grid is-col-min-12 is-gap-0'>
              <div className={`cell ${styles.weddingCell}`}>
                <BackgroundImg href='/wedding/itinerary' img={threeWitchesImg}>
                  <Link href='/wedding/itinerary' className={styles.weddingLink}>itinerary</Link>
                </BackgroundImg>
              </div>
              <div className={`cell ${styles.weddingCell}`}>
                <BackgroundImg img={eye1Img}></BackgroundImg>
              </div>
              <div className={`cell ${styles.weddingCell}`}>
                <BackgroundImg href='/wedding/cocktailparty' img={superiority1Img}>
                  <Link href='/wedding/cocktailparty' className={styles.weddingLink}>cocktail party</Link>
                </BackgroundImg>
              </div>
              <div className={`cell ${styles.weddingCell}`}>
                <BackgroundImg href='/wedding/ceremony' img={nineOrchardImg}>
                  <Link href='/wedding/ceremony' className={styles.weddingLink}>ceremony</Link>
                </BackgroundImg>
              </div>
              <div className={`cell ${styles.weddingCell}`}>
                <BackgroundImg href='/wedding/reception' img={receptionImg}>
                  <Link href='/wedding/reception' className={styles.weddingLink}>reception</Link>
                </BackgroundImg>
              </div>
              <div className={`cell ${styles.weddingCell}`}>
                <BackgroundImg href='/wedding/dresscode' img={hairdresser}>
                  <Link href='/wedding/dresscode' className={styles.weddingLink}>dress code</Link>
                </BackgroundImg>
              </div>
              <div className={`cell ${styles.weddingCell}`}>
                <BackgroundImg href='/wedding/questions' img={bat1Img}>
                  <Link href='/wedding/questions' className={styles.weddingLink}>q+a</Link>
                </BackgroundImg>
              </div>
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
            <div className='section'>
              <div className='container'>
                <P>Thursday, October 31, 2024</P>
                <P>9 Orchard Street, New York, New York</P>
              </div>
            </div>
          </div>
        </div>
      </Layout> 
  )
}