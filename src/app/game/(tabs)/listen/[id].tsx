import { useLocalSearchParams } from 'expo-router'
import { Text } from 'react-native'

export default function GameReading() {
  const { id } = useLocalSearchParams()

  return <Text className='text-gray-500'>Listen to game {id}</Text>
}
