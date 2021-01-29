import React, { Component } from 'react';
import './Hangman.css';
import GuessLetter from '../actions/guessLetter';
import { connect } from 'react-redux';
import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";

class Hangman extends Component {
  constructor(props){
    super(props);
    this.state = {seconds: 20};
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }
 
  static defaultProps = {
    maxWrong: 6,
    images: [step0, step1, step2, step3, step4, step5, step6],
  }
 
  componentDidMount(){
    this.startTimer();
  }
  makeGuess(letter){
    this.props.GuessLetter(letter);
    this.setState({seconds:20})
    this.startTimer();
 }
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
      <button
        class='btn btn-lg btn-primary m-2'
        key={letter}
        value={letter}
        onClick={this.makeGuess.bind(this, letter)}
        disabled={this.props.game.guesses.indexOf(letter)>=0?true:false}
      >
        {letter}
      </button>
    ));
  }
  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({   
      seconds: seconds,
    });
    if (seconds == 0) { 
      clearInterval(this.timer);
    }
  }
  
 
  render() {
    const gameOver = this.props.game.wrongGuessesCount >= this.props.maxWrong || this.state.seconds ==0;
    const isWinner = this.props.game.format.split(" ").join("")=== this.props.game.word;
    let gameStat = this.generateButtons();

    if (isWinner) {
      gameStat = "You Won!!!"
    }

    if (gameOver) {
      gameStat = "You Lost!!!"
    }
   
    return (
      <div >
         <div className="float-right">{gameOver || isWinner?  'Game Over': 'Time Left :' +this.state.seconds } </div>
        <div className="float-right">Wrong Guesses: {this.props.game.wrongGuessesCount} of {this.props.maxWrong}</div>
        <div className="text-center">
          <img src={this.props.images[this.props.game.wrongGuessesCount]} alt=""/>
        </div>
        <div className="text-center">
          <p>Guess the Programming Language:</p>
          <p>
            {!gameOver ? this.props.game.format : this.props.game.word}
          </p>
          <p>{gameStat}</p>
          
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {

  return {
    game: state.game

  }
}

export default connect(mapStateToProps, { GuessLetter })(Hangman)
