import styles from './footer.module.css'
import P from './paragraph'
import A from './anchor'
import Image from "next/legacy/image";
import allImages from '../utils/images'

export default function Footer({ home }) {
    //TODO: Fix this
    const allImgStyles = [
        styles.footerImg0, styles.footerImg10, styles.footerImg20, styles.footerImg30, 
        styles.footerImg40, styles.footerImg50, styles.footerImg60, styles.footerImg70, 
        styles.footerImg80, styles.footerImg90, styles.footerImg100,
    ];
    
    const randomImgStyle = allImgStyles[Math.floor(Math.random()*allImgStyles.length)];
    const randomImg = allImages[Math.floor(Math.random() * allImages.length)]

    return(
        <footer className={`footer ${home ? styles.footerNoNav : styles.footerNav}`}>
           <div className={styles.footerImgWrapper}>
            <Image 
                // src="/images/renaissance/2560px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg"
                src={randomImg}
                height={250}
                layout="fill"
                objectFit="cover"
                className={randomImgStyle}
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
                        <P><A href="/stories" target="_blank">stories</A></P>
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
                        <P><A href="/contact">contact</A></P>
                    </div>
                </div>
           )}
            
        </footer>
    )
}
