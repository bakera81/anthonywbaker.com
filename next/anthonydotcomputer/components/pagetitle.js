// import Image from "next/image"
import allImages from '../utils/images'

import styles from './pagetitle.module.css'


export default function ({ children }) {

  const randomImg = allImages[Math.floor(Math.random() * allImages.length)]

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className="level">
          <div className={`level-right has-text-right is-hidden-mobile ${styles.level}`}>
            <img 
              className={styles.img} 
              src={randomImg.src}
              alt="Another Renaissance painting"
            />
                {/*TODO: FLip this to fluid and make it fill the height title is-1  */}
                {/* TODO: Figure out how to style this image. Maybe use fixed and get the dimensions */}
                  {/* <Image 
                      src="/images/renaissance/2560px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg"
                      // height={85}
                      // className="level-item"
                      layout="fill"
                      // objectFit="contain"
                  /> */}
          </div>
          <div className="level-right">
            <h1 className={`title is-1 ${styles.pageTitle}`}>{children}</h1>
          </div>
        </div>
      </div>
    </section>
  )
}