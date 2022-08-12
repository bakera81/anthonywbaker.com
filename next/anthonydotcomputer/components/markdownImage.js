import Image from 'next/image'

import style from './markdownImage.module.css'

// export async function getStaticProps() {
//     // const imageWithSize = image;
//     const size = await probe(src);
//     // console.log("IMAGE")
//     // console.log(size)
//     return size
// }

export default function MarkdownImage({ src }) { 
    
    console.log("SRC")
    console.log(src)
    // console.log("SIZE")
    // console.log(size)
    return (
        <div className={style.imgContainer}>
            <Image
                src={src}
                layout="fill"
                objectFit="scale-down"
            />
        </div>
    )
}