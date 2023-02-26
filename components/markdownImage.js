import Image from 'next/image'
// import markdownImgMap from '../utils/markdownImages'
// import test from '../utils/markdownImages'
import styles from './markdownImage.module.css'

// export async function getStaticProps() {
//     // const imageWithSize = image;
//     const size = await probe(src);
//     // console.log("IMAGE")
//     // console.log(size)
//     return size
// }

// export async function getStaticProps()


export default function MarkdownImage({ src }) { 
    return (
        <div className={styles.imgContainer}>
            {console.log({step: 'MarkDown Image component', obj: src})}
            <Image
                src={src}
                layout="fill"
                objectFit="scale-down"
            />
        </div>
    )
}