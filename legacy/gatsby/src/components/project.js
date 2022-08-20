import React from "react"

import PageTitle from "./pagetitle"


export default props => {
  const imgOrder = props.imgRight ? 1 : 0
  return (
    <>
      <PageTitle>{props.title}</PageTitle>
      <section className="section">
        <div css={{alignItems: `center;`}} className="columns">
          <div className="column" css={{order: `${imgOrder}`}}>
            <img css={{display: `block;`, margin: `0 auto;`}} src={props.imgSrc} />
          </div>
          <div className="column">
            {props.children}
          </div>
        </div>
      </section>
    </>
  )
}
