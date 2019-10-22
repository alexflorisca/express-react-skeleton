import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import { BrowserRouter } from 'react-router-dom';

const rootEl = document.getElementById('app');
const app = <BrowserRouter><App /></BrowserRouter>;

// Assume server rendered markup`
// Rehydrating client
ReactDOM.hydrate(app, rootEl);

if (module.hot) {
  module.hot.accept();
}
