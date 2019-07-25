/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import Image from "gatsby-image"
import Link from "@affectionatedoor/gatsby-theme-ui/src/components/Link"

import { Comment, Heart } from "./Icons"

const Card = ({ id, comments, likes, localFile }) => (
  <Link
    to={`/${id}`}
    aria-label="todo"
    sx={{
      width: "100%",
      py: [3],
      px: [1, 3],
      willChange: "transform",
      transition: "transform 0.25s ease-out",
      ":focus": {
        transform: "translateY(-5px) scale(1.01)",
      },
      ":focus .tags": {
        bg: "#00000038",
        visibility: "visible"
      },
      ":hover": {
        transform: "translateY(-5px) scale(1.01)",
      },
      ":hover .tags": {
        bg: "#00000048",
        visibility: "visible"
      },
    }}
  >
    <div
      sx={{
        position: "relative",
        boxShadow: theme => `2px 2px 2px 2px ${theme.colors.mute}`,
      }}
    >
      <div
        className="tags"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          zIndex: 1,
          bg: "transparent",
          display: "flex",
          visibility: "hidden",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "white",
        }}
      >
        <div sx={{ textAlign: "left" }}>
          <strong sx={{ fontSize: 3, mr: 2 }}>
            <Heart /> {likes}
          </strong>
          <strong sx={{ fontSize: 3 }}>
            <Comment /> {comments}
          </strong>
        </div>
      </div>
      {/* TODO BgImage */}
      <Image
        title={id} //TODO
        fluid={localFile.childImageSharp.fluid}
        style={{ height: "400px" }}
      />
    </div>
  </Link>
)

Card.propTypes = {
  id: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  localFile: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
}

export default Card
