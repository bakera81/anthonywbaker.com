const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const sluggify =  fullPath => {
  return fullPath.replace(/^.*[\\\/]/, '').replace('\.md', '')
}

// This isn't working anymore
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `RecipesYaml`) {
    // Generate slugs from the filename and add them to the node
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions
  return graphql(`
    {
      allFile(filter: {relativePath: {regex: "/recipes/"}, ext: {eq: ".md"}}) {
        edges {
          node {
            childMarkdownRemark {
              fileAbsolutePath
              frontmatter {
                title
              }
              html
            }
          }
        }
      }
    }
    `
).then(result => {
    result.data.allFile.edges.forEach(({ node }) => {
      createPage({
        path: `/recipes/${sluggify(node.childMarkdownRemark.fileAbsolutePath)}`,
        component: path.resolve(`./src/templates/recipe.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          title: node.childMarkdownRemark.frontmatter.title,
          // category: include whether it is a meat, salad. etc
          slug: sluggify(node.childMarkdownRemark.fileAbsolutePath),
          // Include fileAbsolutePath so I can use it on the page template to filter a query on markdownRemark (instead of sitePage)
          fileAbsolutePath: node.childMarkdownRemark.fileAbsolutePath,
          // TODO: I should be able to dump the AST here without having to query every potential child node of the AST
          html: node.childMarkdownRemark.html,
        },
      })
    })
  })
}
