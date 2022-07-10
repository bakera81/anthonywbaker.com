import styles from './footer.module.css'
import P from './paragraph'
import A from './anchor'

export default function Footer({ home }) {
    return(
        <footer className={`footer ${home ? styles.footerNoNav : styles.footerNav}`}>
            {/* <Img fluid={randomImg.node.childImageSharp.fluid}
           imgStyle={{objectFit: `cover`, objectPosition: `50% ${randomCropPct}%`, height: `250px`}}
           style={{height: `250px`}} /> */}
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
