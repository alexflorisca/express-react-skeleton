import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Nav from './Nav';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <div>
      <Nav />
      <Switch>
				<Route exact path="/"><Home /></Route>
				<Route path="/about"><About /></Route>
				<Route path="/contact"><Contact /></Route>
			</Switch>
    </div>
  );
}

export default App;
