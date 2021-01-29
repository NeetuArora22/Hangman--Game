export const GUESS_LETTER = 'GUESS_LETTER'

export default (letter) => {
  return {
    type: GUESS_LETTER,
    payload: letter
  }
}
