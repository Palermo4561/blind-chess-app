import { Chess, validateFen } from 'chess.js'

export const START_FEN = new Chess().fen()

export function pgnToFen(pgnString: string): string {
  const chess = new Chess()
  chess.loadPgn(pgnString)
  const fenString = chess.fen()
  const fenValidation = validateFen(fenString)

  if (fenValidation.ok) {
    return chess.fen()
  } else {
    throw Error(fenValidation.error)
  }
}

export function getNumberMoves(moves: string): number {
  return Math.ceil(moves.split(' ').length / 2)
}

export function getStrippedPgn(fullPgn: string): string {
  const splitPgn = fullPgn.split('\n\n')
  if (splitPgn.length < 2) throw Error('Invalid PGN')
  const pgnMoves = splitPgn[1]
  if (pgnMoves.charAt(0) !== '1') throw Error('Invalid PGN')
  return pgnMoves
}

export function getMoveArray(strippedPgn: string): string[] {
  return strippedPgn
    .split(/\s*\d+\.\s+/)
    .splice(1)
    .map((fullMove) => fullMove.split(' '))
    .reduce((acc, curr) => acc.concat(curr), [])
}
