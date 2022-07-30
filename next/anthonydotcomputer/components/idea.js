import renderHastToReact from "../helpers/renderHastToReact"

import style from './idea.module.css'

// import {AnchorLink} from "gatsby-plugin-anchor-links"
// import hastToHyperscript from "hast-to-hyperscript";
// import GithubSlugger from "github-slugger"
// var slugger = new GithubSlugger()
var slugger = require('github-slugger').slug;



// const renderHastToReact = node => {
//     return hastToHyperscript(React.createElement, node);
// }


// https://www.gatsbyjs.org/packages/gatsby-plugin-anchor-links/
export default function Idea({ heading, paragraphs }) {
    return (
        <section className="section">
        {/* <AnchorLink to={`/ideas#${slugger(props.heading)}`} title={props.heading} /> */}
        <a id={slugger(heading)} href={`/ideas#${slugger(heading)}`}>
            <h4 className={`title is-4 ${style.heading}`}>{heading}</h4>
        </a>
        {/* For each paragraph, render a P and it's children */}
        <div className={style.MdContainer}>
            {paragraphs.map(paragraph => (
                renderHastToReact(paragraph)
            ))}
        </div>
        </section>
    )
}