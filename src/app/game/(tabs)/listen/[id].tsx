import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { GestureResponderEvent, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { ChessboardRef } from 'react-native-chessboard'
import colors from 'tailwindcss/colors'

import ChessListenSettingsModal from '@/components/ChessListenSettingsModal'
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
  const {
    voice,
    extensiveReading,
    showBoard: showBoardSettings,
    showCoordinates: showCoordinatesSettings,
  } = useSettingsContext()
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false)
  const [showBoard, setShowBoard] = useState<boolean>(showBoardSettings.listening)
  const [showCoordinates, setShowCoordinates] = useState<boolean>(showCoordinatesSettings.listening)
  const [chessMoveText, setChessMoveText] = useState<string>('Start Position')

  const settings = {
    showBoard,
    showCoordinates,
  }

  const setSettings = {
    showBoard: setShowBoard,
    showCoordinates: setShowCoordinates,
  }

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

  const updateMoveText = (nextMoveIndex: number) => {
    if (nextMoveIndex > 0) setChessMoveText(movesArray[nextMoveIndex - 1])
    else setChessMoveText('Start Position')
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
    if (!settings.showBoard) {
      updateMoveText(currentMoveIdx.current)
    }
  }

  const resetBoard = () => {
    currentMoveIdx.current = 0
    chessboardRef.current?.resetBoard()
    if (!settings.showBoard) {
      setChessMoveText('Start Position')
    }
  }

  useEffect(() => updateMoveText(currentMoveIdx.current), [showBoard])

  return (
    <View>
      <View className='relative flex flex-col items-center justify-center'>
        <View
          className={cn('z-10 mx-auto mb-5 mt-10 rounded-2xl bg-yellow-700 p-3', settings.showBoard ? '' : 'opacity-0')}
        >
          <View className='rounded-sm border-2 border-black'>
            <Chessboard
              ref={chessboardRef}
              boardSize={300}
              gestureEnabled={false}
              withLetters={settings.showCoordinates}
              withNumbers={settings.showCoordinates}
              colors={{
                black: colors.yellow[800],
                white: colors.orange[300],
              }}
            />
          </View>
        </View>
        <Text className={cn('absolute z-20 mx-auto text-5xl', settings.showBoard ? 'opacity-0' : '')}>
          {chessMoveText}
        </Text>
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
        <ChessDictationButton
          iconString='gear'
          buttonText='Settings'
          className='bg-gray-400'
          onButtonPress={() => {
            setSettingsVisible(true)
          }}
        />
      </View>
      <ChessListenSettingsModal
        visible={settingsVisible}
        setVisible={setSettingsVisible}
        settings={settings}
        setSettings={setSettings}
      />
    </View>
  )
}
