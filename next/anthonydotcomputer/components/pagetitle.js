import Image from "next/image"

import style from './pagetitle.module.css'


// export default props => {
//    const data = useStaticQuery(
//      graphql`
//        query {
//          allFile(filter: {relativePath: {regex: "/renaissance/"}}) {
//            edges {
//              node {
//                relativePath
//                childImageSharp {
//                  fixed(height: 85) {
//                    ...GatsbyImageSharpFixed
//                  }
//                }
//              }
//            }
//          }
//        }
//      `
//   )

//   const randomImg =  data.allFile.edges[Math.floor(Math.random() * data.allFile.edges.length)]

export default function ({ children }) {
  return (
    <section className={`section ${style.section}`}>
      <div className="container">
        <div className="level">
          <div className={`level-right has-text-right is-hidden-mobile ${style.level}`}>
          {/*TODO: FLip this to fluid and make it fill the height title is-1  */}
            <Image 
                src="/images/renaissance/2560px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg"
                height={85}
                layout="fill"
                objectFit="cover"
            />
          </div>
          <div className="level-right">
            <h1 className={`title is-1 ${style.pageTitle}`}>{children}</h1>
          </div>
        </div>
      </div>
    </section>
  )
}