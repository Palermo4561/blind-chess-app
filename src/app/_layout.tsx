// adding FontAwesome icons to the a library
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell'
import { faChess } from '@fortawesome/free-solid-svg-icons/faChess'
import { faChessBoard } from '@fortawesome/free-solid-svg-icons/faChessBoard'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons/faDumbbell'
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear'
import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
// styles from NativeWind
import '~/global.css'

library.add(faChess, faGear, faTrophy, faChessBoard, faDumbbell, faBell, faUser)

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
        <StatusBar style='auto' />
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}
