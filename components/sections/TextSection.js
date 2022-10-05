import React from 'react'
import SimpleBlockContent from '../SimpleBlockContent'
import styles from './TextSection.module.css'
import Section from '../Section'

const TextSection = ({ heading, label, text, _type }) => {
  return (
    <Section as="div" className={styles.root} type={_type}>
      <section className={styles.article}>
        <div className={styles.label}>{label}</div>
        <h2 className={styles.heading}>{heading}</h2>
        {text && <SimpleBlockContent blocks={text} />}
      </section>
    </Section>
  )
}

export default TextSection
