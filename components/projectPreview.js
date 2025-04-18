import Link from 'next/link'
import Image from "next/legacy/image"
import P from "./paragraph"

import { css } from '@emotion/react'

import styles from './projectPreview.module.css'



export default function ProjectPreview({ slug, description, img, themeColor, backgroundColor }) {
  // const containerClasses = props.alignRight == true ? `column is-half is-offset-half` : `column is-half`
  const childImgStyle = css`
    & > span >img {
      border-color: ${backgroundColor} !important; 
      background-color: ${backgroundColor} !important;
    }
  `

  return (
    <div css={childImgStyle} className={`column is-one-quarter-desktop is-half-tablet ${styles.projectPreviewWrapper}`} >
      <Link href={slug} legacyBehavior>
      {/* Instead of !important, use this to style next images: https://www.peterlunch.com/snippets/next-image-styling */}
        <Image 
          src={img}
          width={100}
          height={100}
          objectFit="contain"
          className={styles.previewImage}
          // This doesn't hydrate for some reason, using child selectors in emotion instead
          style={{borderColor: `${backgroundColor} !important`, backgroundColor: `${backgroundColor} !important`}}
          /> 
      </Link>
      <P className={styles.projectDescription} style={{textAlign: `center`}}>
        <Link href={slug} className={styles.previewLink}>
          {description}
        </Link>
      </P>
    </div>
  );
}