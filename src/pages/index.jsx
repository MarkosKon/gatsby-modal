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
      {/* <Styled.h1>{username} Instagram Feed</Styled.h1> */}
      {/* Hardcoding a link to the Instagram account. */}
      <Styled.h1>
        <a
          href="https://www.instagram.com/alicexz/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "inline-block",
            color: "primary",
            "&:hover": { color: "accent" },
            "&:active": { color: "accent" },
            "&:focus": {
              outline: "1px solid transparent",
              boxShadow: theme => `0px 0px 0px 2px ${theme.colors.accent}`,
            },
          }}
        >
          {username} Instagram Feed
        </a>
      </Styled.h1>
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
