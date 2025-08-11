import { Chess, validateFen } from 'chess.js'

import { LichessGame } from '@/types/lichess'

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

export function getNumberMoves(lichessGame: LichessGame): number {
  return Math.ceil(lichessGame.moves.split(' ').length / 2)
}
