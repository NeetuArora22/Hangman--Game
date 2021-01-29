import { GUESS_LETTER } from '../actions/guessLetter';
import words from '../dummyData/Words';

let word = words[Math.floor(Math.random() * words.length)];
let array = []
for (let i = 0; i < word.length; i++) {
  array.push('_')
}

let format = array.join(' ')

let startGame = {
  word,
  format,
  guesses: [],
  wrongGuessesCount: 0,
  status: 'player'
 }

 function wrongGuessCount(word, guesses) {
   console.log(guesses);
  var failedGuess = []
  for (var i = 0; i < guesses.length; i++) {
    var wrongGuess = guesses[i]
    if (word.indexOf(guesses[i]) === -1) {
      failedGuess.push(wrongGuess)
    }
  }
  return failedGuess.length
}

function showGuess(word, guesses) {
  var guessed = []
  var letters = word.split("")
  for (var i = 0; i < letters.length; i++) {
    if (guesses.indexOf(letters[i]) !== -1) {
      guessed.push(letters[i])
    } else {
      guessed.push("_")
    }
  }
  return guessed.join(" ")
}

function isWinner(word, guesses) {
  var countWrong = wrongGuessCount(word, guesses)
  var secretWord = word.split("").join(" ")
  var correct = showGuess(word, guesses)
  if (countWrong < 6 && secretWord === correct) {
    return 'winner'
  } else if (countWrong < 6){
    return 'player'
  } else {
    return 'loser'
  }
}
export default ({word, format, guesses, wrongGuessesCount, status} = startGame, { type, payload } = {}) => {
  switch(type) {
    case GUESS_LETTER :
      let newGuesses = guesses.concat([payload])
      let newGuessCount = wrongGuessCount(word,newGuesses )
      let showLetter = showGuess(word, newGuesses)

      return {
        word,
        format: showLetter,
        guesses: newGuesses,
        wrongGuessesCount: newGuessCount,
        status: isWinner(word, newGuesses)
      }

    default :
      return {word, format, guesses, wrongGuessesCount, status}
  }
}
