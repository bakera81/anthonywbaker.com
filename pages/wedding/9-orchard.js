import Layout from "../../components/wedding/layout";
import PageTitle from "../../components/wedding/pagetitle";
import P from '../../components/paragraph'
import Image from "next/image";
import Link from "next/link";

import nineOrchardImg from '../../public/images/wedding/nine_orchard_3.jpg'

export default function() {
  return(
    <Layout title='Where to stay'>
      <PageTitle>Where to stay</PageTitle>
      <P>We'll be staying at <Link href='https://nineorchard.com/'>9 Orchard Street, New York, NY, 10002</Link></P>
      <P>One of our love languages is "time spent", so it was important to us that we all stay together (or at least nearby).</P>
      <P>For parking, we recommend:</P>
      <ul>
        <li>59 Allen Street (shortest walk). Book via <Link href='https://ipark.com/'>iPark.</Link></li>
        <li>240 East Broadway / 200 Clinton Street. Book via <Link href='https://cityparking.nyc/home'>City Parking.</Link></li>
        <li>44 Elizabeth Street (below Anthony's old apartment). Book via <Link href='https://ipark.com/'>iPark.</Link></li>
      </ul>
      <Image
        src={nineOrchardImg}
        width={600} 
      />
      </Layout>
  )
}