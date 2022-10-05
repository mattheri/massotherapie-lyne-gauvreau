import React from 'react'
import styles from './Hero.module.css'
import SimpleBlockContent from '../../SimpleBlockContent'
import { Cta } from '../../blocs'
import Section from '../../common/Section'
import { builder } from '../../../helpers/imageHelpers'
import cn from "classnames";

const urlFor = (source) => builder.image(source)

const Hero = ({ heading, backgroundImage, tagline, ctas, _type }) => {

  const style = backgroundImage
    ? {
      backgroundImage: `url("${urlFor(backgroundImage).width(2000).auto('format').url()}")`,
    }
    : {}

  return (
    <Section fluid className={cn(styles.root, 'px-0')} type={_type} style={style}>
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
