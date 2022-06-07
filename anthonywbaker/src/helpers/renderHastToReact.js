import React from "react"
import hastToHyperscript from "hast-to-hyperscript";

const renderHastToReact = node => {
    return hastToHyperscript(React.createElement, node);
}

export default renderHastToReact
