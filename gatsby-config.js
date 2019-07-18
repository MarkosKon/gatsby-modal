module.exports = {
  siteMetadata: {
    title: "Alice X. Zhang",
  },
  plugins: [
    "@affectionatedoor/gatsby-theme-ui",
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `alicexz`,
      },
    },
  ],
}
