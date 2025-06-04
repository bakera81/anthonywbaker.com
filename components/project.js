import PageTitle from "./pagetitle"
import Image from "next/legacy/image"

import styles from './project.module.css'

export default function Project({ children, title, imgRight, imgSrc }) {
    return(
        <>
        <PageTitle>{title}</PageTitle>
        <section className="section">
        <div className={`columns is-desktop ${styles.projectColumnContainer}`}>
            <div className={`column ${imgRight ? styles.projectColumn1 : styles.projectColumn0}`} >
                <Image 
                    src={imgSrc} 
                    objectFit="contain"
                />
                {/* <img style={{display: `block;`, margin: `0 auto;`}} src={imgSrc} /> */}
            </div>
            <div className="column">
                {children}
            </div>
        </div>
        </section>
        </>
    )
}
