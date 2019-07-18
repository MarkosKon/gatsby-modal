/** @jsx jsx */
import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { jsx, Container, Styled } from "theme-ui"
import { graphql, navigate, PageRenderer } from "gatsby"
import Img from "gatsby-image"
import Modal from "react-modal"
import Link from "@affectionatedoor/gatsby-theme-ui/src/components/Link"

import { Times, Heart, Comment } from "../../components/Icons"

import "./style.css"

Modal.setAppElement(`#___gatsby`)

const modalStyles = {
  content: {
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    border: null,
    background: "transparent",
    padding: "0",
  },
  overlay: {
    overflow: "auto",
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.58)",
  },
}

const InstaPostTemplate = ({
  data: {
    instaNode: {
      caption,
      comments,
      id,
      likes,
      localFile: {
        childImageSharp: { fluid },
      },
      timestamp,
      username,
    },
  },
}) => {
  // PageRenderer stuff.
  const building = typeof window === "undefined"
  const [indexPageData, setIndexPageData] = useState(
    !building && window.indexPageData
  )
  useEffect(() => {
    window.setIndexPageData = () => {
      setIndexPageData(window.indexPageData)
    }
  }, [])

  // Modal stuff.
  const [modalOpen, setModalOpen] = useState(true)
  const modalCloseTimeout = 300
  const closeModal = () => {
    console.log('close modal called')
    setModalOpen(false)
    setTimeout(() => navigate(`/`, { replace: true }), modalCloseTimeout)
  }
  return (
    <div>
      <PageRenderer
        key={"/"}
        location={{ pathname: "/" }}
        pageResources={indexPageData}
        path="/"
      />
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Modal" // TODO
        closeTimeoutMS={modalCloseTimeout}
      >
        <Styled.root>
          <Container sx={{ bg: "background", p: [3, 4] }}>
            <Link
              to="/"
              aria-label="close modal"
              sx={{ float: "right", py: 2, px: 3 }}
              onClick={e => {
                e.preventDefault()
                closeModal()
              }}
            >
              <Times sx={{ fontSize: 6, color: "accent" }} />
            </Link>
            <h1 sx={{ mb: 2 }}>
              Posted by {username} on {timestamp}
            </h1>
            <div>
              <small sx={{ mr: 3 }}>
                <Comment sx={{ color: "secondary", fontSize: 3 }} /> {comments}
              </small>
              <small sx={{ mr: 3 }}>
                <Heart sx={{ color: "secondary", fontSize: 3 }} /> {likes}
              </small>
            </div>
            <p sx={{ mt: 4 }}>{caption}</p>
            <Img title={id} fluid={fluid} />
          </Container>
        </Styled.root>
      </Modal>
    </div>
  )
}

InstaPostTemplate.propTypes = {
  data: PropTypes.shape({
    instaNode: PropTypes.shape({
      caption: PropTypes.string.isRequired,
      comments: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      localFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({ fluid: PropTypes.object.isRequired })
          .isRequired,
      }).isRequired,
      timestamp: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default InstaPostTemplate

export const query = graphql`
  query InstaPostModal($id: String) {
    instaNode(id: { eq: $id }) {
      likes
      id
      localFile {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      timestamp
      username
      comments
      caption
    }
  }
`
