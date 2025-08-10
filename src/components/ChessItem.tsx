import { Text, View, ViewProps } from 'react-native'
import Chessboard from 'react-native-chessboard'
import { ChessboardProps } from 'react-native-chessboard/lib/typescript/context/props-context'
import colors from 'tailwindcss/colors'

import { cn } from '@/lib/utils'

interface ChessItemProps extends ViewProps {
  game: any
  chessBoardProps?: ChessboardProps
}

export default function ChessItem({ chessBoardProps, game, className, ...props }: ChessItemProps) {
  return (
    <View
      className={cn('m-5 flex flex-row justify-start rounded-lg bg-gray-500 p-3 align-middle', className)}
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
      <Text className='m-auto text-xl text-white'>Game Details</Text>
    </View>
  )
}
