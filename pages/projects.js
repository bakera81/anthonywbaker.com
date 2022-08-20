import Layout from '../components/layout'
import PageTitle from '../components/pagetitle'
import ProjectPreview from '../components/projectPreview'

import styles from './projects.module.css'

//TODO: Maybe move this to getStaticProps
import allProjectMetadata from '../utils/projects'

export default function Projects() {
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