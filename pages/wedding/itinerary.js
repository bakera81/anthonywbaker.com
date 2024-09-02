import Layout from "../../components/wedding/layout";
import PageTitle from "../../components/wedding/pagetitle";
import P from '../../components/paragraph'

export default function() {
  return(
    <Layout title='Wedding Itinerary'>
      <PageTitle>Wedding Itinerary</PageTitle>
      <h1 className='is-3 title has-text-centered'>Wednesday, October 30, 2024</h1>
      <div className='container'>
        <div className='section'>
          <ul>
            <li>1:00 Check in @ 9 Orchard. Feel free to arrive earlier and drop your bags at the hotel.</li>
            <li>2:00 Foot massages @ Happy Renew Day Spa II </li>
            <li>Cocktail party</li>
          </ul>
          <h1 className='is-3 title has-text-centered'>Halloween, October 30, 2024</h1>
          <ul>
            <li>9:30 Breakfast @ The Swan Room in the hotel lobby.</li>
            <li>5:00 Ceremony @ Room 515, 9 Orchard Street.</li>
            <li>6:30m Uptown F Train to 36th Street.</li>
            <li>7:00 Dinner at Kean's.</li>
          </ul>
          <h1 className='is-3 title has-text-centered'>Friday, November 1, 2024</h1>
          <ul>
            <li>11:00 Checkout @ 9 Orchard.</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}