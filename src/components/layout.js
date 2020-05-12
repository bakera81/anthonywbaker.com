import React from "react"

import "../styles/global.scss"

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

const renderNav = props => {
  if (props.hideName) {
    return
  }
  return <NavBar />
}

export default props => (
  <>
    {renderNav(props)}
    <section className="section">
      <div className="container">
        {props.children}
      </div>
    </section>
    {renderFooter(props)}
  </>
)
