import Section from '../Section';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Booking = ({ script, _type }) => {
	const router = useRouter();

	const removeScript = () => {
		const script = document.getElementById('booking');
		if (script) script.remove();
	}

	useEffect(() => {
		return () => {
			router.events.on('routeChangeStart', removeScript);
		}
	}, [router])

	return <Section type={_type}>
		<script type="text/javascript" async src="https://static.zcal.co/embed/v1/embed.js"></script>
		<div class="zcal-inline-widget"><a href="https://zcal.co/i/h6RdOGG5" target="_blank" rel="noreferrer"></a></div>
	</Section>
}

export default Booking;