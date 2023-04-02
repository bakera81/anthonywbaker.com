import Layout from  '../../components/layout'
import PageTitle from '../../components/pagetitle'
import P from '../../components/paragraph'
import Link from 'next/link'

// import styles from './recipes.module.css'

import { getStoriesFromDatabase } from '../../utils/stories'


export async function getStaticProps() {
    const storiesDataUnsorted = await getStoriesFromDatabase()
    const storiesData = storiesDataUnsorted.sort(function(a, b) {
        var textA = a.title.toUpperCase();
        var textB = b.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return {
        props: {
            storiesData,
        },
    };
}


export default function AllStories({ storiesData }) {
  return (
    <Layout title="All Stories">
      <PageTitle>All Stories</PageTitle>
      {storiesData.map((story) => (
        <P><Link href={story.slug}>{story.title}</Link></P>
      ))}
    </Layout>
  )
}