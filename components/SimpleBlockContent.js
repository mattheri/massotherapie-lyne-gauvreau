import { PortableText } from '@portabletext/react'
import EmbedHTML from './EmbedHTML'
import Figure from './Figure'

function SimpleBlockContent({ blocks }) {
  if (!blocks) {
    console.error('Missing blocks')
    return null
  }

  return (
    <PortableText
      value={blocks}
      components={{
        types: {
          embedHTML: EmbedHTML,
          figure: Figure,
        },
      }}
    />
  )
}

export default SimpleBlockContent
