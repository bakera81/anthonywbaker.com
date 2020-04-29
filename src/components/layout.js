import React from "react"

import 'bulma/css/bulma.css'

import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"

import { useStaticQuery, graphql } from "gatsby"
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
