import { Chess, validateFen } from 'chess.js'

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
