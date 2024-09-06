import Layout from "../../components/wedding/layout";
import PageTitle from "../../components/wedding/pagetitle";
import P from '../../components/paragraph'
import Image from "next/image";
import Link from "next/link";

// import burgerImg from '../../public/images/wedding/superiority_burger_2.webp'

export default function() {
  return(
    <Layout title='Reception'>
      <PageTitle>Reception</PageTitle>
      <P>Join us for a champagne toast at <Link href='https://maps.app.goo.gl/pmzPYFfQS9JAYxnFA'>The Swan Room</Link> at 5:00 on Halloween.</P>
      <P> Around 6:30, join the happy couple for a romantic subway ride uptown.</P>
      <P>Dinner will be at <Link href='https://maps.app.goo.gl/D291rF9Sfbzy8mC57'>Keens Steakhouse</Link> at 7:00.</P>
    </Layout>
  )
}