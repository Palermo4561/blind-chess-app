import { useLocalSearchParams } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { useLoadedGamesContext } from '@/contexts/LoadedGamesContext'
import { useSettingsContext } from '@/contexts/SettingsContext'
import { getMoveArray } from '@/utils/chess'
import { readChessMove } from '@/utils/text-to-speech'

const Chessboard = React.lazy(() => import('react-native-chessboard'))

export default function GameReading() {
  const { id } = useLocalSearchParams()
  const { games } = useLoadedGamesContext()
  const { voice, extensiveReading } = useSettingsContext()
  const [currentMoveIdx, setCurrentMoveIdx] = useState<number>(0)

  const chosenGame = games.find((game) => game.id === id)
  if (chosenGame === undefined) throw Error('Game not found')
  const gameMovesArray = getMoveArray(chosenGame.strippedPgn)

  const getChessMoveString = useCallback(
    () => gameMovesArray[Math.floor(currentMoveIdx / 2)][currentMoveIdx % 2],
    [gameMovesArray, currentMoveIdx]
  )

  const [moveText, setMoveText] = useState<string>(() => getChessMoveString())

  const readAndUpdateMoveIdx = () => {
    readChessMove(moveText, { voice, extensiveReading })
    setCurrentMoveIdx((prev) => prev + 1)
  }

  useEffect(() => {
    setMoveText(() => getChessMoveString())
  }, [getChessMoveString])

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
      <Text className='text-white'>Next move to read: {moveText}</Text>
      <Text onPress={readAndUpdateMoveIdx} className='bg-blue-400 p-20'>
        Read the next move
      </Text>
    </View>
  )
}
