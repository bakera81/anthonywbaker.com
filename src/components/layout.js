import React from "react"

import 'bulma/css/bulma.css'

import NavBar from "./navbar"
import Footer from "./footer"


export default props => (
  <div>
    <NavBar />
    <section className="section">
      <div className="container">
        {props.children}
      </div>
    </section>
    <Footer hideNav={props.hideNav} />
  </div>
)
