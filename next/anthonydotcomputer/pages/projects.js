import Header from '../components/header'
import Layout from '../components/layout'
import PageTitle from '../components/pagetitle'
import ProjectPreview from '../components/projectPreview'

import styles from './projects.module.css'

import allProjectMetadata from '../utils/projects'
// console.log(allProjectMetadata)
// import { frontmatter } from './projects/2048-reinforcement-learning'
// console.log(frontmatter)

export default function Projects() {

    return (
        <>
        <Header>Projects</Header>
        <Layout>
          <PageTitle>Projects</PageTitle>
          <section className={`section ${styles.projectSection}`}>
            <div className="columns is-multiline">
              {allProjectMetadata.map((project , i) => (
                <ProjectPreview
                  alignRight={i % 2 === 0}
                  description={project.description}
                  slug={`projects/${project.slug}`}
                  img={project.previewImage}
                  themeColor={project.themeColor}
                  backgroundColor={project.backgroundColor}
                />
              ))}
            </div>
          </section>
          {/* <PageTitle>In Progress</PageTitle>
          <section className="section" css={{paddingLeft: `0`, paddingRight: `0`}}>
            <div className="columns is-multiline">
              {inProgressProjects.map(({ node }, i) => (
                <ProjectPreview
                  alignRight={i % 2 === 0}
                  description={node.frontmatter.description}
                  slug={`projects/${sluggify(node.fileAbsolutePath)}`}
                  imgSrc={findPreviewImage(node.frontmatter.preview)}
                  themeColor={node.frontmatter.themeColor}
                />
              ))}
            </div>
          </section> */}
        </Layout>
        </>
      )
}