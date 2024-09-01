import Image from "next/legacy/image"

import styles from './BackgroundImg.module.css'

export default function BackgroundImg({ children, height, img }) {
  let imgHeight = height ? height : 250; 
  return (
    <div className={styles.bgImgContainer}>
      <div className={styles.bgImgOverlay}>
        {children}
      </div>
      <Image 
        src={img}
        layout='fill'
        objectFit='cover'
        height={imgHeight}
        />
    </div>
  )
}