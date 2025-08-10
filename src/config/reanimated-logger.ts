import { ReanimatedLogLevel, configureReanimatedLogger } from 'react-native-reanimated'

// unfortunately, this has to be done because react-native-chessboard isn't made correctly
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // :(
})
