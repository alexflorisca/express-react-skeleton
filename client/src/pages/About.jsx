import React from 'react';
import { Helmet } from 'react-helmet-async';

function About() {
	return (
		<section id="about">
			<Helmet>
				<title>About Me</title>
			</Helmet>
			<h1>About me</h1>
			<p>I'm awesome</p>
		</section>
	);
}

export default About;
