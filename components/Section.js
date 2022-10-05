import classNames from 'classnames'

const Section = ({ type, as: As = "section", children, ...rest }) => {
	return (
		<As data-section-type={`${type}`} {...rest}>{children}</As>
	)
}

export default Section