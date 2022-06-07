import React from "react"

import { navigate } from "@reach/router"
import { Link } from "gatsby"

export default props => (
  <Link css={props.style} onClick={() => { navigate(-1) }} className="navbar-item">
    (go back)
  </Link>
)
