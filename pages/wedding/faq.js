import Layout from "../../components/wedding/layout";
import PageTitle from "../../components/wedding/pagetitle";
import P from '../../components/paragraph'
import Image from "next/image";
import Link from "next/link";

export default function() {
  return(
    <Layout title='FAQs'>
      <PageTitle>FAQs</PageTitle>
      <P><span style={{fontWeight: 'bold'}}>Are you still having a big wedding?</span> Sort of. We will be having casual celebration at our house summer 2025. Everyone is invited! Details coming soon.</P>
      <P><span style={{fontWeight: 'bold'}}>Other questions?</span> Text us and we'll add them here.</P>
    </Layout>
  )
}