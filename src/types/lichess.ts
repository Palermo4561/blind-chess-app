import { components } from '@lichess-org/types'

export type LichessGame = Required<components['schemas']['GameJson'] & { lastFen: string }>
