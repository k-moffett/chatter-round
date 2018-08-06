import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LandingPage, HomePage } from './components/index'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/" component={LandingPage}/>
      </Router>
    );
  }
}

export default App;
