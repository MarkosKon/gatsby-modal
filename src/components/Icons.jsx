import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faHeart, faComment } from "@fortawesome/free-solid-svg-icons"

const Times = props => <FontAwesomeIcon {...props} icon={faTimes} />
const Heart = props => <FontAwesomeIcon {...props} icon={faHeart} />
const Comment = props => <FontAwesomeIcon {...props} icon={faComment} />

export { Times, Heart, Comment }
