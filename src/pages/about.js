import React from "react"

import { Link } from "gatsby"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import PageTitle from  "../components/pagetitle"
import P from "../components/paragraph"
import Hr from "../components/hr"
import shuffle from "../helpers/shuffle"

const aboutMe = [
  "Product manager.", "Growth marketer.", "Data scientist.", "Designer.", "Communicator.", "Process enthusiast.", "Aspiring Renaissance man."
]

class AboutMe extends React.Component {

// constructor to set state and bind "this"
      constructor(props) {
          super(props);
          this.items = aboutMe;
          this.handleClick = this.handleClick.bind(this);
        }

      // function to handle the click
       handleClick() {
        this.setState({
          items: shuffle(aboutMe)
        });
      }

      render() {
        return(
          <P>{this.items.map(item => (item + " "))} <span css={{fontSize: `.7em`}}>[<a onClick={this.handleClick}>shuffle</a>]</span></P>
        )
      }
}

export default () => {
  return (
    <Layout>
      <PageTitle>About</PageTitle>
      <AboutMe />
      {/*TODO: only shuffle on click
      <P>{shuffle(aboutMe).map(item => (item + " "))} <span css={{fontSize: `.7em`}}>[<Link to="/about">shuffle</Link>]</span></P>
      */}
      <Hr />
      <P>Creative writing & computer science (bachelor's) @ <a href="https://www.lafayette.edu/">Lafayette College</a>: 2011-2015.</P>
      <P>Technology, innovation, and education (master's) @ <a href="https://www.gse.harvard.edu/masters/tie" >Harvard Graduate School of Education</a>: 2015-2016.</P>
      <P>Product, data science, and growth @ <a href="https://www.datacamp.com">DataCamp</a>: 2016-present.</P>
      <Hr />
      <P><Link to="/contact">Contact</Link></P>
    </Layout>
  )
}
