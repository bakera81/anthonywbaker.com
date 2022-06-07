import React from "react"


import { Link } from "gatsby"

export default props => (
  <Link to={props.slug} className="navbar-item">
    {props.text}
  </Link>
)
