import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
				<Route exact path="/"><Home /></Route>
				<Route path="/me"><Me /></Route>
				<Route path="/me-too"><MeToo /></Route>
			</Switch>
    </div>
  );
}

export default App;
