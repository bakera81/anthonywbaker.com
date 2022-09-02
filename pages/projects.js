import Layout from '../components/layout'
import PageTitle from '../components/pagetitle'
import ProjectPreview from '../components/projectPreview'

import styles from './projects.module.css'

import { fetchAllProjectMetadata } from '../utils/projects'

export async function getStaticProps() {
  const allProjectMetadata = await fetchAllProjectMetadata();

  return {
    props: {
      allProjectMetadata,
    },
  };
}

export default function Projects({ allProjectMetadata }) {
    return (
        <Layout title="Projects">
          <PageTitle>Projects</PageTitle>
          <section className={`section ${styles.projectSection}`}>
            <div className="columns is-multiline">
              {allProjectMetadata.map((project , i) => (
                <ProjectPreview
                  // TODO: fix alignRight
                  alignRight={i % 2 === 0}
                  description={project.description}
                  slug={`projects/${project.slug}`}
                  img={project.preview}
                  themeColor={project.themeColor}
                  backgroundColor={project.themeColor}
                />
              ))}
            </div>
          </section>
        </Layout>
      )
}