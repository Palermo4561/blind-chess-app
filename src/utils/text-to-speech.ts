import * as Speech from 'expo-speech'

import { LETTER_TO_PIECE_MAP } from '@/constants/chess-notation'
import { ChessReadingSettings } from '@/contexts/SettingsContext'

import { isLowerCase } from './helpers'

export function readChessMove(move: string, settings: ChessReadingSettings): void {
  // TODO: make this move receptive to all voice settings (but for now just the voice is fine)

  const speak = (text: string) => {
    Speech.speak(text, {
      voice: settings.voice,
      language: 'en-US',
    })
  }

  let moveArray = move.split('')

  if (moveArray.length < 2) {
    throw Error('Invalid move')
  }

  // Castling
  if (moveArray[0] === 'O') {
    if (moveArray.length === 3) {
      speak('Short Castle')
    } else if (moveArray.length === 5) {
      speak('Long Castle')
    } else {
      throw Error('Invalid move')
    }
    return
  }

  moveArray = moveArray.map(
    (letter: string): string => LETTER_TO_PIECE_MAP[letter as keyof typeof LETTER_TO_PIECE_MAP] ?? letter
  )

  if (!settings.extensiveReading) {
    const lastChar = moveArray.pop()! // we know the array has at least one element
    moveArray.push(lastChar === '+' ? 'check' : lastChar === '#' ? 'checkmate' : lastChar)
    speak(moveArray.join(' '))
    return
  }

  // process the check word
  const lastChar = moveArray.pop()! // we know the array has at least one element
  const checkWord = lastChar === '+' ? 'check' : lastChar === '#' ? 'checkmate' : ''
  if (checkWord === '') {
    moveArray.push(lastChar)
  }
  // moveArray now does not contain + or #, and that is stored in checkWord
  // moveArray has also been processed with letters to piece, but no paws moves words are in there

  // only in use if the move was actually a simple move (and not a capture)
  const squareMovedTo = moveArray.slice(-2).join(' ')

  // pawn move
  if (isLowerCase(moveArray[0]) && moveArray[0].length === 1) {
    // can take the form of e4 or exd4
    if (moveArray[1] === 'x') {
      // a capture
      speak(`${moveArray[0]} pawn captures ${squareMovedTo}`)
    } else {
      // a simple move
      speak(`pawn ${moveArray.join(' ')}`)
    }
    return
  }

  const indexOfCaptureChar = moveArray.indexOf('x')

  if (indexOfCaptureChar === -1) {
    speak(`${moveArray.slice(0, -2).join(' ')} to ${squareMovedTo} ${checkWord}`.trim())
  } else {
    moveArray[indexOfCaptureChar] = 'captures'
    speak(`${moveArray.join(' ')} ${checkWord}`.trim())
  }

  // possible variations:
  /* 
  Pawn move: e4 => lowercase, number 
  Pawn capture: dxe5 => lowercase, x, lowercase, number
  Piece move: Nb5 => uppercase, lowercase, number
  Piece move (multiple options): Nbd5 => uppercase, lowercase, lowercase, number
  Piece capture: Nxb5 => uppercase, x, lowercase, number
  Piece capture (multiple options): Nbxd5 => uppercase, lowercase, x, lowercase, number
//  Castle kingside: O-O
//  Castle queenside: O-O-O

  
  split all characters up 
  if first_letter == O => say 'long' or 'short' castle
  sub out capitals for their matching counterparts 
  

  MINIMAL: 
    sub out + and # for check and checkmate in place 
    just read right what you have, with a space in between
  
  EXTENSIVE: 
    sub out + and # for check and checkmate, but remove from the end 
    const checkWord = arr[-1] == '+' ? 'check' : arr[-1] == '#' ? 'checkmate' : ''
    arr = arr[:arr.length] // remove last character 
    const squareMovedTo = lastTwoDigits
    change 'x' to 'captures'

    if first_letter_lowercase 
      if len(arr) == 2: // just a normal piece move  
        'pawn' + 'to' squareMovedTo
      else: // had a capture 
        read arr[0] + 'pawn' + arr[1] squareMovedTo
      
    else: 
      read normally 

  */
}
