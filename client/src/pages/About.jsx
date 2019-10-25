import React from 'react';
import { Title } from 'react-head';
import { HiddenMessage } from '../HiddenMessage/HiddenMessage';

function About() {
	return (
		<section id="about">
			<Title>About Me</Title>
			<h1>About me</h1>
			<p>I'm awesome</p>

			<p>HiddenMessage component demo. (See client/src/HiddenMessage)</p>
			<HiddenMessage initialShow={true} />
		</section>
	);
}

export default About;
