/** @jsx jsx */
import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { jsx, Styled } from "theme-ui"
import { graphql, navigate, PageRenderer } from "gatsby"
import Img from "gatsby-image"
import Modal from "react-modal"
import Link from "@affectionatedoor/gatsby-theme-ui/src/components/Link"

import { Times, Heart, Comment } from "../../components/Icons"

import "./style.css"

Modal.setAppElement(`#___gatsby`)

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.58)",
  },
  content: {
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    maxWidth: "960px",
    margin: "32px auto",
    padding: 0,
    border: 0,
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
    setModalOpen(false)
    setTimeout(() => navigate(`/`), modalCloseTimeout)
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
          <div
            sx={{
              bg: "background",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Link
              to="/"
              aria-label="close modal"
              sx={{
                alignSelf: "flex-end",
                width: "60px",
                py: 2,
                px: 3,
                m: [3, 4],
              }}
              onClick={e => {
                e.preventDefault()
                closeModal()
              }}
            >
              <Times sx={{ fontSize: 6, color: "accent" }} />
            </Link>
            <h1 sx={{ mb: 2, px: [3, 4] }}>
              Posted by {username} on {timestamp}
            </h1>
            <div sx={{ px: [3, 4] }}>
              <small sx={{ mr: 3 }}>
                <Comment sx={{ color: "secondary", fontSize: 3 }} /> {comments}
              </small>
              <small sx={{ mr: 3 }}>
                <Heart sx={{ color: "secondary", fontSize: 3 }} /> {likes}
              </small>
            </div>
            <p sx={{ mt: 4, order: [1, 0], px: [3, 4] }}>{caption}</p>
            <Img title={id} fluid={fluid} sx={{ mt: [4, 2], order: [0, 1] }} />
          </div>
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
