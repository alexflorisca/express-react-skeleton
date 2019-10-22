import React from 'react';
import { Helmet } from 'react-helmet-async';

function Home() {
	return (
		<section id="home">
			<Helmet>
				<title>Express React Skeleton</title>
			</Helmet>
			<h1>Express React Skeleton</h1>
			<p>Go Me</p>
		</section>
	);
}

export default Home;