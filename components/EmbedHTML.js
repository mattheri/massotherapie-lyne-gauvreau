import React from 'react'

const EmbedHTML = ({ node }) => {
  const { html } = node
  if (!html) {
    return undefined
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default EmbedHTML
