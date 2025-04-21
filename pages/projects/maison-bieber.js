import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"
import A from '../../components/anchor'
import Image from "next/legacy/image"

import projectImage1 from "../../public/images/projects/maison-bieber-1.jpg";
import projectImage2 from "../../public/images/projects/maison-bieber-2.jpg";
import projectImage3 from "../../public/images/projects/maison-bieber-3.jpg";
import projectImage4 from "../../public/images/projects/maison_bieber_wordmark.png";
// import previewImage from "../../public/images/projects/maison_bieber_wordmark.png";

export const frontmatter = {
  title: 'Maison Bieber',
  description: 'Bespoke upcycled flannel.',
  slug: 'maison-bieber',
  preview: projectImage2,
  themeColor: '#4F608C', // '#7FAAE3',
  updatedAt: '2024-12-25',
  completed: true,
}

// Font generator: https://www.fontbolt.com/font/balmain-font/
export default function Flannel() {
  return(
    <Layout title="Maison Bieber">
      <Project imgRight title={frontmatter.title} imgSrc={projectImage4}>
        <P style={{textAlign: `left`}}>
          Bespoke upcycled flannel.
        </P>
        <P style={{textAlign: `left`}}>
          <A href="/contact">Contact</A> for pricing.
        </P>
      </Project>
      <div className="section">
        <div className="columns">
          <div className="column is-6">
            <Image
              src={projectImage1}
              objectFit="contain" />
          </div>
        </div>
      </div>
      <div className="section">
        <div className="columns">
          <div className="column is-6 is-hidden-mobile">
          </div>
          <div className="column is-6">
            <Image
              src={projectImage3}
              objectFit="contain" />
          </div>
        </div>
      </div>
      <div className="section">
        <div className="columns">
          <div className="column is-6">
            <Image
              src={projectImage2}
              objectFit="contain" />
          </div>
        </div>
      </div>
    </Layout>
  )
}