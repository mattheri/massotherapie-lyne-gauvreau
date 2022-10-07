import React from 'react'
import SVG from 'react-inlinesvg'
import styles from "./Logo.module.scss";

const Logo = ({ logo }) => {
	if (!logo || !logo.asset) {
		return null
	}

	if (logo.asset.extension === 'svg') {
		return <SVG src={logo.asset.url} className={styles.root} />
	}

	return <img src={logo.asset.url} alt={logo.title} className={styles.root} />
}

export default Logo