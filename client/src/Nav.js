import React from 'react';
import { Link, Switch } from 'react-router-dom';

export default function Nav() {
	return (
		<header>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/me">Me</Link>
				<Link to="/me-too">Me Too</Link>
			</nav>
		</header>
	);
}

export function Me() {
	return (
		<div><h3>Me</h3></div>
	);
};

export function MeToo() {
	return (
		<div><h3>Me Too</h3></div>
	)
};