import React, { Component } from 'react';
import './App.css';

import Hangman from './components/Hangman';




class App extends Component {
  restartGame() {
    window.location.reload()
  }
  render() {
    return (
      <div className="App">
        <h1 className="App-title">The Hangman Game</h1>
        <br />
        <Hangman/>
        <button onClick={this.restartGame}> New Word</button>
      </div>
    );
  }
}


export default App
