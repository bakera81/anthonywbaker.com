import React from "react"

import 'bulma/css/bulma.css'

import NavBar from "./navbar"
import Footer from "./footer"

const renderFooter = props => {
  if (props.hideFooter) {
    return
  }
  return (
    <Footer hideNav={props.hideNav} />
  )
}

export default props => (
  <>
    <NavBar />
    <section className="section">
      <div className="container">
        {props.children}
      </div>
    </section>
    {renderFooter(props)}
  </>
)
