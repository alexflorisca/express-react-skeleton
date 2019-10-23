import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import { BrowserRouter } from 'react-router-dom';
import { HeadProvider } from 'react-head';

const rootEl = document.getElementById('app');
const app = (
  <HeadProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HeadProvider>
);

// Assume server rendered markup`
// Rehydrating client
ReactDOM.hydrate(app, rootEl);

if (module.hot) {
  module.hot.accept();
}
