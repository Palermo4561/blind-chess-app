import { Text, View, ViewProps } from 'react-native'
import Chessboard from 'react-native-chessboard'
import { ChessboardProps } from 'react-native-chessboard/lib/typescript/context/props-context'
import colors from 'tailwindcss/colors'

import { cn } from '@/lib/utils'
import { getNumberMoves } from '@/utils/chess'

interface ChessItemProps extends ViewProps {
  game: any
  chessBoardProps?: ChessboardProps
}

export default function ChessItem({ chessBoardProps, game, className, ...props }: ChessItemProps) {
  return (
    <View
      className={cn('m-2 flex flex-row justify-start gap-2 rounded-lg bg-gray-500 p-3 align-middle', className)}
      {...props}
    >
      <View className='bg-black p-1'>
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
