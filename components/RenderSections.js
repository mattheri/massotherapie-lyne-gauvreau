import React, { Fragment } from 'react'
import * as SectionComponents from './sections'
import { capitalize } from '../helpers/stringHelpers'

function resolveSections(section) {
  // eslint-disable-next-line import/namespace
  const Section = SectionComponents[capitalize(section._type)]

  if (Section) {
    return Section
  }

  console.error('Cant find section', section) // eslint-disable-line no-console
  return null
}

const RenderSections = ({ sections }) => {
  if (!sections) {
    console.error('Missing section')
  }

  return (
    <Fragment>
      {sections.map((section) => {
        const SectionComponent = resolveSections(section)
        if (!SectionComponent) {
          return null;
        }
        return <SectionComponent {...section} key={section._key} />
      })}
    </Fragment>
  )
}

export default RenderSections
