import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import { fetchGamesForUser } from '@/api/lichess'
import ChessItem from '@/components/ChessItem'

export default function Awards() {
  const [games, setGames] = useState([])

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGamesForUser('DannytheDonkey', 5)
      setGames(data)
    }

    loadGames()
  }, [])

  console.log(games)

  return (
    <View>
      {games.map((game: any, idx: number) => (
        <ChessItem key={idx} game={game} />
      ))}
    </View>
  )
}
