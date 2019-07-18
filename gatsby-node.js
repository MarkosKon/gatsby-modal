exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    query {
      allInstaNode {
        nodes {
          id
        }
      }
    }
  `)

  if (result.errors) {
    console.log(result.errors)
    return
  }

  const postTemplate = require.resolve("./src/templates/InstaModalPost/index.jsx")
  // const postTemplate = require.resolve("./src/templates/InstaPostTemplate.jsx")
  result.data.allInstaNode.nodes.forEach(post => {
    createPage({
      path: post.id,
      component: postTemplate,
      context: {
        id: post.id,
      },
    })
  })
}
