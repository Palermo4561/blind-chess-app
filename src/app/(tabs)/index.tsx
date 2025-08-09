import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Chessboard from 'react-native-chessboard'
import colors from 'tailwindcss/colors'

import { fetchGamesForUser } from '@/api/lichess'
import { pgnToFen } from '@/utils/chess'

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

  const chessProps = {
    gestureEnabled: false,
    withLetters: false,
    withNumbers: false,
    colors: {
      black: colors.yellow[800],
      white: colors.orange[300],
    },
  }

  return (
    <View>
      <Text>Games:</Text>
      {games.map((game: any, idx: number) => (
        <Chessboard key={idx} fen={pgnToFen(game.pgn)} {...chessProps} />
      ))}
    </View>
  )
}
