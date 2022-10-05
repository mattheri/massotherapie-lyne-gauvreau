import Section from "../../Section";
import Script from "next/script";

const Appointments = ({ _type, title }) => {
	return (
		<Section type={_type}>
			<Script
				src="https://static.zcal.co/embed/v1/embed.js"
				onLoad={(e) => "hello world"}
			/>
			<h2>{title}</h2>
			<div className="zcal-inline-widget"><a href="https://zcal.co/i/h6RdOGG5">Massage - Schedule a meeting</a></div>
		</Section>
	)
}

export default Appointments