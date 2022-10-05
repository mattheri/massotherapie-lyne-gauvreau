import Script from 'next/script'

const DynamicBookingLoader = ({ script }) => {
	return (
		<>
			<Script src={script} type="text/javascript" onError={(e) => console.log(e)} />
			<div className="zcal-inline-widget"><a href="https://zcal.co/i/h6RdOGG5"></a></div>
		</>
	)
}

export default DynamicBookingLoader