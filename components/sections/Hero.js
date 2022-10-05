import React from 'react'
import imageUrlBuilder from '@sanity/image-url'
import styles from './Hero.module.css'
import client from '../../client'
import SimpleBlockContent from '../SimpleBlockContent'
import Cta from '../Cta'
import Section from '../Section'

const urlFor = (source) => imageUrlBuilder(client).image(source)

const Hero = ({ heading, backgroundImage, tagline, ctas, _type }) => {

  const style = backgroundImage
    ? {
      backgroundImage: `url("${urlFor(backgroundImage).width(2000).auto('format').url()}")`,
    }
    : {}

  return (
    <Section className={styles.root} type={_type} style={style}>
      <div className={styles.content}>
        <h1 className={styles.title}>{heading}</h1>
        <div className={styles.tagline}>{tagline && <SimpleBlockContent blocks={tagline} />}</div>
        {ctas && (
          <div className={styles.ctas}>
            {ctas.map((cta) => (
              <Cta {...cta} key={cta._key} />
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}

export default Hero
