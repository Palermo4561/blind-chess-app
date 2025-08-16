import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { useLoadedGamesContext } from '@/contexts/LoadedGamesContext'

const Chessboard = React.lazy(() => import('react-native-chessboard'))

export default function GameReading() {
  const { id } = useLocalSearchParams()
  const { games } = useLoadedGamesContext()

  const chosenGame = games.find((game) => game.id === id)
  if (chosenGame === undefined) throw Error('Game not found')

  return (
    <View>
      <Text className='text-gray-500'>Listen to game {id}</Text>
      <Chessboard
        boardSize={150}
        gestureEnabled={false}
        withLetters={false}
        withNumbers={false}
        colors={{
          black: colors.yellow[800],
          white: colors.orange[300],
        }}
        fen={chosenGame.lastFen}
      />
    </View>
  )
}
