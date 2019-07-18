/** @jsx jsx */
import { jsx, Main, Footer, Styled } from "theme-ui"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import SkipLink from "@affectionatedoor/gatsby-theme-ui/src/components/SkipLink"
import Header from "@affectionatedoor/gatsby-theme-ui/src/components/Header"
import ThemeSwitcher from "@affectionatedoor/gatsby-theme-ui/src/components/ThemeSwitcher"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <Styled.root>
      <SkipLink>Skip to content</SkipLink>
      <Header siteTitle={data.site.siteMetadata.title} />
      <ThemeSwitcher />
      <Main sx={{ px: [3, 4] }}>{children}</Main>
      <Footer sx={{ p: 4 }}>
        {`© ${new Date().getFullYear()}, Built with`}
        <Styled.a
          sx={{ color: "primary", ml: 1 }}
          href="https://www.gatsbyjs.org"
        >
          Gatsby
        </Styled.a>
      </Footer>
    </Styled.root>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
