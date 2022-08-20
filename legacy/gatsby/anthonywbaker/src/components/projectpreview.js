import React from "react"

import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import P from "./paragraph"


const ProjectPreview = ({ props }) => {
  // const containerClasses = props.alignRight == true ? `column is-half is-offset-half` : `column is-half`
  return (
    <div className="column is-one-quarter-desktop is-half-tablet" css={{textAlign: `center`, paddingBottom: `6em`}}>
      <Link to={props.slug}>
        <GatsbyImage
          image={props.imgSrc.childImageSharp.gatsbyImageData}
          imgStyle={{border: `33px solid ${props.themeColor}`, backgroundColor: props.backgroundColor}}
          style={{backgroundColor: props.backgroundColor}} />
      </Link>
      <P style={{fontSize: `.7em`, textAlign: `center`}}>{props.description}</P>
    </div>
  );
}

export default ProjectPreview
