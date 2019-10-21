import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import { Home, About, Contact } from './Pages';

function App() {
  return (
    <div id="app">
      <Nav />
      Oh heeey asd
      <Switch>
				<Route exact path="/"><Home /></Route>
				<Route path="/about"><About /></Route>
				<Route path="/contact"><Contact /></Route>
			</Switch>
    </div>
  );
}

export default App;
