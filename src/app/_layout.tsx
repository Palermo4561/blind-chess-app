import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import '~/global.css'

import '@/config/icons'
import '@/config/reanimated-logger'
import { LoadedGamesProvider } from '@/contexts/LoadedGamesContext'
import { SettingsProvider } from '@/contexts/SettingsContext'

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SettingsProvider>
        <LoadedGamesProvider>
          <GestureHandlerRootView>
            <Stack>
              <Stack.Screen
                name='(tabs)'
                options={{
                  title: 'Home',
                  headerShown: false,
                }}
              />
            </Stack>
            <StatusBar style='auto' />
          </GestureHandlerRootView>
        </LoadedGamesProvider>
      </SettingsProvider>
    </ThemeProvider>
  )
}
