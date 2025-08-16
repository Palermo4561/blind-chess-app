import { components } from '@lichess-org/types'

export type LichessGame = Required<components['schemas']['GameJson'] & { lastFen: string }>

export type GameAttributes = {
  id: string
  type: 'featured' | 'user' | 'other'
  lastFen: string
  rawMoves: string
  strippedPgn: string
}
