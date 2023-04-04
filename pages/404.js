import Image from "next/legacy/image"
import Link from 'next/link'

import Layout from "../components/layout"
import P from "../components/paragraph"

import styles from './404.module.css'

export default function Customer404() {
  return (
    <Layout hideFooter>
      <div className="section">
        <div className={`${styles.container404}`}>
            <Image 
                src="/images/renaissance/Portrait_of_Margaret_van_Eyck.jpg"
                width={589}
                height={745} 
            />
        </div>
      </div>
      <div className={`section ${styles.returnHomeContainer}`}>
        <P style={{textAlign: `center`}}>Oh no...</P>
            <P style={{textAlign: `center`, paddingTop: 0}}>
                <Link href="/" className={styles.returnHome}>
                     Return home.
                </Link>
            </P>
      </div>
    </Layout>
  );
}