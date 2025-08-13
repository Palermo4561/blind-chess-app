import React from 'react'
import { Text, View } from 'react-native'

import { useSettingsContext } from '@/contexts/SettingsContext'
import { readChessMove } from '@/utils/text-to-speech'

export default function Awards() {
  const { voice, extensiveReading } = useSettingsContext()

  const SpeakButton = ({ text }: { text: string }) => {
    return (
      <Text
        className='mx-auto my-2 p-3 text-2xl text-blue-700'
        onPress={() => readChessMove(text, { voice, extensiveReading })}
      >
        {text}
      </Text>
    )
  }

  const moves = ['e4', 'dxe5', 'Nb5', 'Nbd5', 'Nxd5', 'Nbxd5', 'O-O', 'O-O-O']

  return (
    <View className='flex w-full flex-col'>
      {moves.map((move: string, idx: number) => (
        <SpeakButton key={idx} text={move} />
      ))}
    </View>
  )
}
