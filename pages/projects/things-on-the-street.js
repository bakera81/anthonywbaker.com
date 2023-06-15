import Layout from '../../components/layout'
import PageTitle from '../../components/pagetitle'
import ThingOnTheStreet from '../../components/thingOnTheStreet'

import rats from '../../public/images/projects/things-on-the-street/rats.jpg'
import meat1 from '../../public/images/projects/things-on-the-street/meat1.jpg'
import meat2 from '../../public/images/projects/things-on-the-street/meat2.jpg'
import ace from '../../public/images/projects/things-on-the-street/ace-of-hearts.jpg'
import shades from '../../public/images/projects/things-on-the-street/shades.jpg'
import sludge from '../../public/images/projects/things-on-the-street/sludge.jpg'
import head from '../../public/images/projects/things-on-the-street/head.jpg'
import salad from '../../public/images/projects/things-on-the-street/salad.jpg'
import paint from '../../public/images/projects/things-on-the-street/paint.jpg'
import giraffe from '../../public/images/projects/things-on-the-street/giraffe.jpg'
import cheese from '../../public/images/projects/things-on-the-street/cheese.jpg'
import superman from '../../public/images/projects/things-on-the-street/superman.jpg'
import confetti from '../../public/images/projects/things-on-the-street/confetti.jpg'
import mushroom from '../../public/images/projects/things-on-the-street/mushroom.jpg'
import petals from '../../public/images/projects/things-on-the-street/petals.jpg'
import chipotle from '../../public/images/projects/things-on-the-street/chipotle.jpg'
import apple from '../../public/images/projects/things-on-the-street/apple.jpg'
import puzzle from '../../public/images/projects/things-on-the-street/puzzle.jpg'
import turtle from '../../public/images/projects/things-on-the-street/turtle.jpg'
import lamb from '../../public/images/projects/things-on-the-street/lamb.jpg'
import rat2 from '../../public/images/projects/things-on-the-street/rat2.jpg'
import asteroid from '../../public/images/projects/things-on-the-street/asteroid.jpg'

export const frontmatter = {
    title: 'Things on the Street',
    description: 'Things on the street (photographs).',
    slug: 'things-on-the-street',
    preview: paint,
    themeColor: '#FFBFDA', // '#f5f403',
    backgroundColor: '',
    updatedAt: '2023-06-14',
    completed: true,
}

export async function getStaticProps() {
    const thingsMetadata = [
        {
            title: 'Rats',
            date: '2021',
            location: 'Two Bridges, Manhattan',
            img: rats,
        },
        {
            title: 'Meat',
            date: '2021',
            location: 'Chinatown, Manhattan',
            img: meat1,
        },
        {
            title: 'Meat (with chili oil)',
            date: '2021',
            location: 'Chinatown, Manhattan',
            img: meat2,
        },
        {
            title: 'Ace of Hearts',
            date: '2021',
            location: 'Lower East Side, Manhattan',
            img: ace,
        },
        {
            title: 'Tiny Sunglasses',
            date: '2021',
            location: 'Battery Park, Manhattan',
            img: shades,
        },
        {
            title: 'Unknown/sludge',
            date: '2021',
            location: 'Chinatown, Manhattan',
            img: sludge,
        },
        {
            title: 'Head',
            date: '2021',
            location: 'Two Bridges, Manhattan',
            img: head,
        },
        {
            title: 'Arugula Salad',
            date: '2021',
            location: 'Two Bridges, Manhattan',
            img: salad,
        },
        {
            title: 'Palette',
            date: '2021',
            location: 'Boerum Hill, Brooklyn',
            img: paint,
        },
        {
            title: 'Giraffe',
            date: '2021',
            location: 'Flatiron, Manhattan',
            img: giraffe,
        },
        {
            title: 'Cheese Puffs',
            date: '2021',
            location: 'Lower East Side, Manhattan',
            img: cheese,
        },
        {
            title: 'Superman',
            date: '2021',
            location: 'Location unknown',
            img: superman,
        },
        {
            title: 'Confetti',
            date: '2022',
            location: 'Chinatown, Manhattan',
            img: confetti,
        },
        {
            title: 'Mushroom',
            date: '2022',
            location: 'NoLiTa, Manhattan',
            img: mushroom,
        },
        {
            title: 'Petals',
            date: '2022',
            location: 'Prospect Heights, Brooklyn',
            img: petals,
        },
        {
            title: 'Chipotle Bowl (with black beans)',
            date: '2022',
            location: 'Prospect Heights, Brooklyn',
            img: chipotle,
        },
        {
            title: 'Apple',
            date: '2022',
            location: 'Prospect Heights, Brooklyn',
            img: apple,
        },
        {
            title: 'Puzzle (melting)',
            date: '2022',
            location: 'Prospect Heights, Brooklyn',
            img: puzzle,
        },
        {
            title: 'Turtle',
            date: '2022',
            location: 'Prospect Heights, Brooklyn',
            img: turtle,
        },
        {
            title: 'Lamb',
            date: '2023',
            location: 'Prospect Heights, Brooklyn',
            img: lamb,
        },
        {
            title: 'Baby Rat',
            date: '2023',
            location: 'Prospect Heights, Brooklyn',
            img: rat2,
        },
        {
            title: 'Asteroid',
            date: '2023',
            location: 'Prospect Heights, Brooklyn',
            img: asteroid,
        }
    ].sort((a,b) => Date.parse(b.date) - Date.parse(a.date))

    return {
        props: {
            thingsMetadata,
        },
    };
}

export default function ThingsOnTheStreet({ thingsMetadata }) {
    return (
        <Layout title="Things on the Street">
          <PageTitle>Things on the Street</PageTitle>
          {/* <section className={`section ${styles.projectSection}`}> */}
          <section className="section">
            <div className="columns is-multiline">
              {thingsMetadata.map((thing) => (
                <ThingOnTheStreet
                    title={thing.title}
                    location={thing.location}
                    date={thing.date}
                    img={thing.img}
                />
              ))}
            </div>
          </section>
        </Layout>
      )
}