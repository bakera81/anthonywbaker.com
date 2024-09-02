import Image from "next/legacy/image"
import Link from "next/link";

import styles from './BackgroundImg.module.css'

export default function BackgroundImg({ children, height, img, href}) {
  let imgHeight = height ? height : 450; 
  return (
    
    <div className={styles.bgImgContainer}>
      <div className={styles.bgImgOverlay}>
        {/* <Link href={href}> */}
          {children}
        {/* </Link> */}
      </div>
      {href ? (
        <Link href={href}>
        <Image 
          src={img}
          layout='fill'
          objectFit='cover'
          height={imgHeight}
          style={{opacity: .6}}
          />
      </Link>
      ) : (
        <Image 
          src={img}
          layout='fill'
          objectFit='cover'
          height={imgHeight}
          style={{opacity: .6}}
          />
      )}
    </div>
  )
}