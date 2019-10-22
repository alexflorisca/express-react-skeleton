import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const rootEl = document.getElementById('app');
const app = (
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

// Assume server rendered markup`
// Rehydrating client
ReactDOM.hydrate(app, rootEl);

if (module.hot) {
  module.hot.accept();
}
