import Image from "next/legacy/image"
import P from "./paragraph"

import styles from './thingOnTheStreet.module.css'



export default function ThingOnTheStreet({ title, location, date, img }) {
  return (
    <div className={`column is-one-quarter-desktop is-half-tablet ${styles.thingPreviewWrapper}`} >
        <Image 
          src={img}
          width={200}
          height={200}
        />
        <P style={{textAlign: `center`}}>
            {title}.
        </P>
        <P style={{textAlign: `center`, paddingTop: `0`, fontStyle: `italic`}}>
            {location}
        </P>
    </div>
  );
}