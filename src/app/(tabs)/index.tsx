import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import Animated from 'react-native-reanimated'

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

  console.log(games[0])

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={Platform.select({
        ios: false,
        web: true,
        default: true,
      })}
    >
      {games.map((game: any, idx: number) => (
        <ChessItem key={idx} game={game} />
      ))}
    </Animated.ScrollView>
  )
}
