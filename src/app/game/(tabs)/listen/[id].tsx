import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Button, GestureResponderEvent, Text, View, ViewProps } from 'react-native'
import colors from 'tailwindcss/colors'

import { useLoadedGamesContext } from '@/contexts/LoadedGamesContext'
import { useSettingsContext } from '@/contexts/SettingsContext'
import { cn } from '@/lib/utils'
import { START_FEN, getMoveArray, pgnToFen } from '@/utils/chess'
import { readChessMove } from '@/utils/text-to-speech'

const Chessboard = React.lazy(() => import('react-native-chessboard'))

interface ChessDictationButtonProps extends ViewProps {
  iconString: IconProp
  buttonTitle: string
  buttonTextColor?: string
  onButtonPress: (event: GestureResponderEvent) => void
}

const ChessDictationButton = ({
  iconString,
  buttonTitle,
  buttonTextColor = colors.white,
  onButtonPress,
  className,
  ...props
}: ChessDictationButtonProps) => {
  return (
    <View className={cn('flex flex-row gap-2 rounded-2xl bg-blue-300 p-4', className)} {...props}>
      <FontAwesomeIcon size={30} color='white' style={{ marginTop: 'auto', marginBottom: 'auto' }} icon={iconString} />
      <View className='mx-auto'>
        <Button onPress={onButtonPress} title={buttonTitle} accessibilityLabel={buttonTitle} color={buttonTextColor} />
      </View>
    </View>
  )
}

export default function GameReading() {
  const { id } = useLocalSearchParams()
  const { games } = useLoadedGamesContext()
  const { voice, extensiveReading } = useSettingsContext()
  const [currentMoveIdx, setCurrentMoveIdx] = useState<number>(0)

  // load game
  const chosenGame = games.find((game) => game.id === id)
  if (chosenGame === undefined) throw Error('Game not found')
  // get a 1D array of moves
  const gameMovesArray = getMoveArray(chosenGame.strippedPgn)

  const readMove = () => {
    readChessMove(gameMovesArray[currentMoveIdx], { voice, extensiveReading })
  }

  const updateMoveIndex = (val = 1) => {
    setCurrentMoveIdx((prev) => Math.max(0, prev + val))
  }

  const resetBoard = () => {
    setCurrentMoveIdx(0)
  }

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
          fen={currentMoveIdx !== 0 ? pgnToFen(gameMovesArray.slice(0, currentMoveIdx).join(' ')) : START_FEN}
        />
      </View>

      <View className='mx-auto my-5 flex flex-col justify-center gap-3 align-middle'>
        <ChessDictationButton
          iconString='forward'
          buttonTitle='Read next chess move'
          onButtonPress={() => {
            readMove()
            updateMoveIndex()
          }}
        />
        <ChessDictationButton
          iconString='backward'
          buttonTitle='Revert one move'
          onButtonPress={() => {
            updateMoveIndex(-1)
          }}
        />
        <ChessDictationButton
          iconString='rotate'
          buttonTitle='Reset board'
          onButtonPress={() => {
            resetBoard()
          }}
        />
      </View>
    </View>
  )
}
