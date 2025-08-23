import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useLocalSearchParams } from 'expo-router'
import React, { useRef } from 'react'
import { GestureResponderEvent, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { ChessboardRef } from 'react-native-chessboard'
import colors from 'tailwindcss/colors'

import { useLoadedGamesContext } from '@/contexts/LoadedGamesContext'
import { useSettingsContext } from '@/contexts/SettingsContext'
import { cn } from '@/lib/utils'
import { getExtendedMovesArray, getMoveArray } from '@/utils/chess'
import { readChessMove } from '@/utils/text-to-speech'

const Chessboard = React.lazy(() => import('react-native-chessboard'))

interface ChessDictationButtonProps extends TouchableOpacityProps {
  iconString: IconProp
  buttonText: string
  onButtonPress: (event: GestureResponderEvent) => void
}

const ChessDictationButton = ({
  iconString,
  buttonText,
  onButtonPress,
  className,
  ...props
}: ChessDictationButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onButtonPress}
      className={cn('flex flex-row gap-2 rounded-2xl bg-blue-300 p-4', className)}
      {...props}
    >
      <FontAwesomeIcon size={30} color='white' style={{ marginTop: 'auto', marginBottom: 'auto' }} icon={iconString} />
      <View className='mx-auto'>
        <Text className='px-2 text-2xl font-bold text-white'>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function GameReading() {
  const { id } = useLocalSearchParams()
  const { games } = useLoadedGamesContext()
  const { voice, extensiveReading } = useSettingsContext()

  const currentMoveIdx = useRef<number>(0)
  const chessboardRef = useRef<ChessboardRef>(null)

  // load game
  const currentGame = games.find((game) => game.id === id)
  if (currentGame === undefined) throw Error('Game not found')
  // get a 1D array of moves
  const movesArray = getMoveArray(currentGame.strippedPgn)
  const gameResult = movesArray.pop() // the final result isn't a valid move, but it's useful info
  const extendedMovesArray = getExtendedMovesArray(movesArray)

  const readMove = () => {
    readChessMove(movesArray[currentMoveIdx.current], { voice, extensiveReading })
  }

  const updateMoveIndex = (val = 1) => {
    if (val === 1) {
      const move = extendedMovesArray[currentMoveIdx.current]
      chessboardRef.current?.move({ to: move.to, from: move.from })
    } else if (val === -1 && currentMoveIdx.current > 0) {
      const move = extendedMovesArray[currentMoveIdx.current - 1]

      // the undo method doesn't work in react-native-chessboard, and you can't input an invalid move
      // thus, you have to reset the board to a specific fen and manually highlight
      chessboardRef.current?.resetBoard(move.before)
      chessboardRef.current?.highlight({ square: move.to })
      chessboardRef.current?.highlight({ square: move.from })
    }
    currentMoveIdx.current = Math.max(0, currentMoveIdx.current + val)
  }

  const resetBoard = () => {
    currentMoveIdx.current = 0
    chessboardRef.current?.resetBoard()
  }

  return (
    <View>
      <View className='mx-auto mt-10 rounded-2xl bg-yellow-700 p-3'>
        <View className='rounded-sm border-2 border-black'>
          <Chessboard
            ref={chessboardRef}
            boardSize={300}
            gestureEnabled={false}
            withLetters={false}
            withNumbers={false}
            colors={{
              black: colors.yellow[800],
              white: colors.orange[300],
            }}
          />
        </View>
      </View>

      <View className='mx-auto my-5 flex flex-col justify-center gap-3 align-middle'>
        <ChessDictationButton
          iconString='forward'
          buttonText='Read next move'
          onButtonPress={() => {
            readMove()
            updateMoveIndex()
          }}
        />
        <ChessDictationButton
          iconString='backward'
          buttonText='Reverse last move'
          onButtonPress={() => {
            updateMoveIndex(-1)
          }}
        />
        <ChessDictationButton
          iconString='rotate'
          buttonText='Reset board'
          onButtonPress={() => {
            resetBoard()
          }}
        />
      </View>
    </View>
  )
}
