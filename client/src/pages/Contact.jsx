import React from 'react';
import { Helmet } from 'react-helmet-async';

function Contact() {
	return (
		<section id="contact">
			<Helmet>
				<title>Contact Me</title>
			</Helmet>
			<h1>Contact Me</h1>
			<p>Check out my <a href="https://github.com/alexflorisca/" target="_blank">github</a></p>
		</section>
	)
}

export default Contact;