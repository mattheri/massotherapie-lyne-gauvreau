import React from 'react'
import Section from '../Section'
import styles from './Mailchimp.module.css'

const Mailchimp = ({ heading, subtitle, _type }) => {
  return (
    <Section className={styles.root} type={_type}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </Section>
  )
}

export default Mailchimp