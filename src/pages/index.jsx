/** @jsx jsx */
import { graphql } from "gatsby"
import { jsx, Styled, Flex } from "theme-ui"
import Layout from "@affectionatedoor/gatsby-theme-ui/src/components/Layout"

import InstaCard from "../components/InstaCard"

export default ({ data }) => {
  const posts = data.allInstaNode.nodes
  const { username } = posts[0]
  return (
    <Layout>
      <Styled.h1>{username} Instagram Feed</Styled.h1>
      <Flex sx={{ flexWrap: "wrap" }}>
        {posts.map(post => (
          <div key={post.id} sx={{ width: ["100%", "100%", "50%", "33%"] }}>
            <InstaCard {...post} />
          </div>
        ))}
      </Flex>
    </Layout>
  )
}

export const query = graphql`
  query IndexQuery {
    allInstaNode(sort: { fields: timestamp, order: DESC }) {
      nodes {
        id
        comments
        likes
        username
        localFile {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
