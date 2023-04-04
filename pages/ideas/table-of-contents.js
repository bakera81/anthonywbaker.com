import Layout from  '../../components/layout'
import PageTitle from '../../components/pagetitle'
import P from '../../components/paragraph'
import Link from 'next/link'

// import styles from './recipes.module.css'

import { getIdeasFromDatabase } from '../../utils/ideas'


export async function getStaticProps() {
    const ideasDataUnsorted = await getIdeasFromDatabase()
    const ideasData = ideasDataUnsorted.sort(function(a, b) {
        var textA = a.title.toUpperCase();
        var textB = b.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return {
        props: {
          ideasData,
        },
    };
}


export default function TableOfContents({ ideasData }) {
  return (
    <Layout title="Ideas">
      <PageTitle>Ideas</PageTitle>
      {ideasData.map((idea) => (
        <P><Link href={idea.slug}>{idea.title}</Link></P>
      ))}
    </Layout>
  )
}