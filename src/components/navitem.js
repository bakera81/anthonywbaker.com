import React from "react"

import 'bulma/css/bulma.css'

import { Link } from "gatsby"

export default props => (
  <Link to={props.slug} className="navbar-item">
    {props.text}
  </Link>
)
