import React from "react"

import styled from "@emotion/styled"

const RecipeListContainer = styled.div`
  padding-bottom: 30px;
`

export default props => (
  <RecipeListContainer className="content">
    <ol>
      {props.list.map(item => (
        <li>
          {item.text}
          {
            item.protip &&
            <ul>
              <li>{item.protip}</li>
            </ul>
          }
        </li>
      ))}
    </ol>
  </RecipeListContainer>
)
