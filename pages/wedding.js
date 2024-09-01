import Layout from '../components/layout'
import ListLink from '../components/listlink'
import P from '../components/paragraph'
import Image from "next/legacy/image"
import BackgroundImg from '../components/wedding/backgroundImg'

import styles from './wedding.module.css'

import img1 from '../public/images/wedding/candycorn.jpg'

export default function NYWedding() {
  return (
      <Layout home>
        <div className='columns'>
          <div className='column'>
            <div className='grid'>
              <div className='cell is-col-min-20' style={{minHeight: 150}}>
                <BackgroundImg img={img1}>
                  WREN
                </BackgroundImg>
              </div>
              <div className='cell'>And</div>
              <div className='cell'>Anthony</div>
              <div className='cell'>Wedding</div>
            </div>
          </div>
          <div className='column'>
            <div className={`level ${styles.listLinkLevel}`}>
              <ListLink href="/about">Wren</ListLink>
              <ListLink href="/stories">and</ListLink>
              <ListLink href="/projects">Anthony</ListLink>
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
