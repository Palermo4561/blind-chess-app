import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import { fetchGamesForUser } from '@/api/lichess'
import { chessUsernames } from '@/constants/api'

export default function Awards() {
  const [games, setGames] = useState([])

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGamesForUser(chessUsernames[0], 5)
      setGames(data)
    }

    loadGames()
  }, [])

  return (
    <View>
      <Text>Games:</Text>
      {games.map((game: any, idx: number) => (
        <Text key={idx}>{game.moves}</Text>
      ))}
    </View>
  )
}
