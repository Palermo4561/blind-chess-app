import React, { Suspense } from 'react'
import { Text, View, ViewProps } from 'react-native'
import { ChessboardProps } from 'react-native-chessboard/lib/typescript/context/props-context'
import colors from 'tailwindcss/colors'

import ChessboardFallback from '@/components/ChessboardFallback'
import { cn } from '@/lib/utils'
import { LichessGame } from '@/types/lichess'
import { getNumberMoves } from '@/utils/chess'

const Chessboard = React.lazy(() => import('react-native-chessboard'))

interface ChessItemProps extends ViewProps {
  game: LichessGame
  chessBoardProps?: ChessboardProps
}

export default function ChessItem({ chessBoardProps, game, className, ...props }: ChessItemProps) {
  return (
    <View
      className={cn('m-2 flex flex-row justify-start gap-2 rounded-lg bg-gray-500 p-3 align-middle', className)}
      {...props}
    >
      <View className='bg-black p-1'>
        <Suspense fallback={<ChessboardFallback />}>
          <Chessboard
            boardSize={150}
            gestureEnabled={false}
            withLetters={false}
            withNumbers={false}
            colors={{
              black: colors.yellow[800],
              white: colors.orange[300],
            }}
            fen={game.lastFen}
            {...chessBoardProps}
          />
        </Suspense>
      </View>
      <View className='grow'>
        <View className='px-auto rounded bg-green-400 p-3'>
          <View className='flex flex-row justify-between'>
            <Text className='text-xl'>Difficulty: </Text>
            <Text className='text-xl underline'>Moderate</Text>
          </View>
        </View>
        <Text className='mx-auto p-2 text-lg text-white'>Number moves: {getNumberMoves(game)}</Text>
      </View>
    </View>
  )
}
