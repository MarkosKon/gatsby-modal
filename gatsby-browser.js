import "@fortawesome/fontawesome-svg-core/styles.css"

// This only works if in the modal page you add a
// Link to the homepage.
export const onPrefetchPathname = ({ loadPage }) => {
  if (window.indexPageData === undefined) {
    loadPage("/").then(result => {
      window.indexPageData = result
      // If we load the modal page directly we need to
      // re-render by changing the state. Otherwise
      // the initial result is null for some reason.
      if (window.setIndexPageData) window.setIndexPageData()
    })
  }
}

// https://github.com/gatsbyjs/gatsby/issues/7454#issuecomment-425403812
export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  return getSavedScrollPosition(location)
}
