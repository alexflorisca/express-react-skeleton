import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { rehydrateMarks } from 'react-imported-component';

const rootEl = document.getElementById('app');
const app = <Router><App /></Router>;

if(process.env.NODE_ENV === 'production') {
	rehydrateMarks().then(() => {
		console.log("hydrating");
		ReactDOM.hydrate(app, element);
	})
}
else {
	console.log("rendering");
	ReactDOM.render(app, rootEl);
}

if (module.hot) {
  module.hot.accept();
}
