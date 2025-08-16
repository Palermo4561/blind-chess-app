'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

import { fetchGamesForUser } from '@/api/lichess'
import { GameAttributes, LichessGame } from '@/types/lichess'
import { getStrippedPgn } from '@/utils/chess'

interface LoadedGamesContextType {
  games: GameAttributes[]
  setGames: Dispatch<SetStateAction<GameAttributes[]>>
}

const LoadedGamesContext = createContext<LoadedGamesContextType | undefined>(undefined)

export const LoadedGamesProvider = ({ children }: { children: ReactNode }) => {
  const [games, setGames] = useState<GameAttributes[]>([])

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGamesForUser('DannytheDonkey', 5)
      const games = data.map((game: LichessGame) => {
        return {
          id: game.id,
          type: 'featured',
          lastFen: game.lastFen,
          rawMoves: game.moves,
          strippedPgn: getStrippedPgn(game.pgn),
        } as GameAttributes
      })
      setGames(games)
    }
    loadGames()
  }, [])

  const value: LoadedGamesContextType = {
    games,
    setGames,
  }

  return <LoadedGamesContext value={value}>{children}</LoadedGamesContext>
}

export const useLoadedGamesContext = () => {
  const context = useContext(LoadedGamesContext)
  if (context === undefined) {
    throw new Error('useLoadedGamesContext must be used within a DataProvider')
  }
  return context
}
