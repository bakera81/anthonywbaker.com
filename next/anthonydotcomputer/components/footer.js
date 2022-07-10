import styles from './footer.module.css'
import P from './paragraph'
import A from './anchor'
import Image from 'next/image';

export default function Footer({ home }) {
    return(
        <footer className={`footer ${home ? styles.footerNoNav : styles.footerNav}`}>
            {/* <Img fluid={randomImg.node.childImageSharp.fluid}
           imgStyle={{objectFit: `cover`, objectPosition: `50% ${randomCropPct}%`, height: `250px`}}
           style={{height: `250px`}} /> */}
           <div className={styles.footerImgWrapper}>
           <Image 
                src="/images/renaissance/2560px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg"
                height={250}
                layout="fill"
                objectFit="cover"
                className={styles.footerImg}
           />
           </div>
           {/* TODO: Fix this */}
           {home ? (
                <></>
           ) : (
                <div className="level">
                    <div className="level-item">
                        <P><A href="/about">about</A></P>
                    </div>
                    <div className="level-item">
                        <P><A href="/projects">projects</A></P>
                    </div>
                    <div className="level-item">
                        <P><A href="/ideas">ideas</A></P>
                    </div>
                    <div className="level-item">
                        <P><A href="/recipes">recipes</A></P>
                    </div>
                    <div className="level-item">
                        <P><a href="https://medium.com/@addiebundren" target="_blank">writing</a></P>
                    </div>
                    <div className="level-item">
                        <P><A href="/contact">contact</A></P>
                    </div>
                </div>
           )}
            
        </footer>
    )
}
