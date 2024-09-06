import Layout from "../../components/wedding/layout";
import PageTitle from "../../components/wedding/pagetitle";
import P from '../../components/paragraph'
import Image from "next/image";
import Link from "next/link";

// import burgerImg from '../../public/images/wedding/superiority_burger_2.webp'

export default function() {
  return(
    <Layout title='Ceremony'>
      <PageTitle>Ceremony</PageTitle>
      <P>Please join us on the balcony (Room 515) at 9 Orchard at 4:30 on Halloween.</P>
      <P>Details coming soon</P>
    </Layout>
  )
}