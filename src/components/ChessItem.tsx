import { StyleSheet, Text, View, ViewProps } from 'react-native'
import Chessboard from 'react-native-chessboard'
import { ChessboardProps } from 'react-native-chessboard/lib/typescript/context/props-context'
import colors from 'tailwindcss/colors'

interface ChessItemProps extends ViewProps {
  game: any
  chessBoardProps?: ChessboardProps
}

export default function ChessItem({ chessBoardProps, game, className, ...props }: ChessItemProps) {
  const chessProps: ChessboardProps = {
    boardSize: 150,
    gestureEnabled: false,
    withLetters: false,
    withNumbers: false,
    colors: {
      black: colors.yellow[800],
      white: colors.orange[300],
    },
  }

  return (
    <View style={[styles.container]} {...props}>
      <Text className='text-white'>Chess Game: </Text>
      <View>
        <Chessboard fen={game.lastFen} {...chessProps} {...chessBoardProps} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.amber[300],
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
})
