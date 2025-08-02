// adding FontAwesome icons to the a library
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChess } from '@fortawesome/free-solid-svg-icons/faChess'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'

// styles from NativeWind
import '@/styles/global.css'

library.add(faChess)

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
      <StatusBar style='auto' />
    </ThemeProvider>
  )
}
