import React from 'react'
import imageUrlBuilder from '@sanity/image-url'
import styles from './ImageSection.module.css'
import client from '../../../client'
import SimpleBlockContent from '../../SimpleBlockContent'
import Cta from '../../blocs/cta/Cta'
import Section from '../../Section'

const builder = imageUrlBuilder(client)

const ImageSection = ({ heading, label, text, image, cta, _type }) => {
  if (!image) {
    return null
  }

  return (
    <Section className={styles.root} type={_type}>
      <figure className={styles.content}>
        <img
          src={builder.image(image).auto('format').width(2000).url()}
          className={styles.image}
          alt={heading}
        />
        <figcaption>
          <div className={styles.caption}>
            <div className={styles.captionBox}>
              <div className={styles.label}>{label}</div>
              <h2 className={styles.title}>{heading}</h2>
              {text && <SimpleBlockContent blocks={text} />}
              {cta && cta.route && <Cta {...cta} />}
            </div>
          </div>
        </figcaption>
      </figure>
    </Section>
  )
}

export default ImageSection
