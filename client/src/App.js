import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Question from './components/Question'
import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <div>
      <Header />
        <Question />
      </div>
    );
  }
}

export default App;
