import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { LandingPage, HomePage } from './components/index'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={LandingPage}/>
          <Route path="/home" component={HomePage}/>
        </div>
      </Router>
    );
  }
}

export default App;
