import Layout from "../../components/wedding/layout";
import PageTitle from "../../components/wedding/pagetitle";
import P from '../../components/paragraph'

export default function() {
  return(
    <Layout title='Wedding Itinerary'>
      <PageTitle>Wedding Itinerary</PageTitle>
      <P>Wedding Itinerary</P>
      <div className='container'>
      <div className='section'>
              <ul>
                <li>Foot massages</li>
                <li>Cocktail party</li>
              </ul>
              <P>Thursday, October 31</P>
              <ul>
                <li>Breakfast</li>
                <li>Ceremony</li>
                <li>Reception</li>
              </ul>
              <P>Friday, November 1</P>
            </div>
            </div>
    </Layout>
  )
}