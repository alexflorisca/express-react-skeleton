import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import { BrowserRouter as Router } from 'react-router-dom';

const rootEl = document.getElementById('app');
ReactDOM.render(
	<Router>
		<App />
	</Router>,
	rootEl
);