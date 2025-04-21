import Layout from "../../components/layout"
import Project from "../../components/project"
import P from "../../components/paragraph"
import A from '../../components/anchor'

import projectImage from "../../public/images/projects/mux.png";
import previewImage from "../../public/images/projects/mux2.png";

export const frontmatter = {
  title: 'MUX News',
  description: 'Improve your media diet with AI.',
  slug: 'mux-news',
  preview: previewImage,
  themeColor: 'blue', 
  updatedAt: '2024-05-01',
  completed: true,
}

export default function Mux() {
  return(
    <Layout title="MUX News">
      <Project imgRight title={frontmatter.title} imgSrc={projectImage}>
        <P style={{textAlign: `left`}}>
        We live in fear and confusion over "the other" and how polarizing politics has become.
        <br/>
        We want to see all sides of each story and make informed decisions.
        <br/>
        We need to get out of our own echo chambers so we can be more empathatic and understanding.
        </P>
        <P style={{textAlign: `left`}}>
          MUX is a Chrome extension that uses AI to surface related headlines for every article you read, right on your favorite news site.
          Do you read the New York Times? MUX will show you the Fox News or Al Jazeera take on the same story.
        </P>
        <P style={{textAlign: `left`}}>
          Get the full story, wherever you read your news. 
        </P>
        <P style={{textAlign: `left`, fontStyle: `italic`}}>
          MUX News is no longer available due to API costs.
        </P>
      </Project>
    </Layout>
  )
}