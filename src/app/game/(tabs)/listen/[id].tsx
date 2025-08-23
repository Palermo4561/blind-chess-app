import { useLocalSearchParams } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { useLoadedGamesContext } from '@/contexts/LoadedGamesContext'
import { useSettingsContext } from '@/contexts/SettingsContext'
import { START_FEN, getMoveArray, pgnToFen } from '@/utils/chess'
import { readChessMove } from '@/utils/text-to-speech'

const Chessboard = React.lazy(() => import('react-native-chessboard'))

export default function GameReading() {
  const { id } = useLocalSearchParams()
  const { games } = useLoadedGamesContext()
  const { voice, extensiveReading } = useSettingsContext()
  const [currentMoveIdx, setCurrentMoveIdx] = useState<number>(0)
  const [movesMadeString, setMovesMadeString] = useState<string>('')

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
    setMovesMadeString((prev) => (prev + ` ${moveText}`).trim())
  }

  useEffect(() => {
    setMoveText(() => getChessMoveString())
  }, [getChessMoveString])

  return (
    <View>
      <Text className='mx-auto text-xl text-white'>Listen to game {id}</Text>
      <View className='mx-auto'>
        <Chessboard
          key={currentMoveIdx}
          boardSize={300}
          gestureEnabled={false}
          withLetters={false}
          withNumbers={false}
          colors={{
            black: colors.yellow[800],
            white: colors.orange[300],
          }}
          fen={movesMadeString !== '' ? pgnToFen(movesMadeString) : START_FEN}
        />
      </View>
      <Text onPress={readAndUpdateMoveIdx} className='bg-blue-400 p-20'>
        Read Next Move
      </Text>
    </View>
  )
}
