import Image from 'next/image'
import styles from './markdownImage.module.css'


export default function MarkdownImage({ src }) { 
    return (
        <div className={styles.imgContainer}>
            <Image
                src={src}
                layout="fill"
                objectFit="scale-down"
            />
        </div>
    )
}