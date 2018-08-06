import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LandingPage, HomePage } from './components/index'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className={App}>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/" component={LandingPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
