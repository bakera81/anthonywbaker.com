import Link from 'next/link'
import Image from "next/image"
import P from "./paragraph"

import styles from './projectPreview.module.css'


export default function ProjectPreview({ slug, description, img, themeColor, backgroundColor }) {
  // const containerClasses = props.alignRight == true ? `column is-half is-offset-half` : `column is-half`
  return (
    <div className={`column is-one-quarter-desktop is-half-tablet ${styles.projectPreviewWrapper}`} >
      <Link href={slug}>
      {/* Instead of !important, use this to style next images: https://www.peterlunch.com/snippets/next-image-styling */}
        <Image 
          src={img}
          width={100}
          height={100}
          className={styles.previewImage}
          style={{borderColor: `${backgroundColor} !important`, backgroundColor: `${backgroundColor} !important`}}
          /> 
      </Link>
      <P className={styles.projectDescription} style={{fontSize: `.7em`, textAlign: `center`}}>
        <Link href={slug} >
          <a className={styles.previewLink}>{description}</a>
        </Link>
      </P>
    </div>
  )
}