import { Dispatch, SetStateAction } from 'react'
import { Modal, ModalProps, Pressable, StyleSheet, Switch, Text, View, ViewProps } from 'react-native'

import { BoardSettings } from '@/contexts/SettingsContext'
import { cn } from '@/lib/utils'

interface ChessListenSettingsModalProps extends ModalProps {
  setVisible: Dispatch<SetStateAction<boolean>>
  settings: Record<keyof BoardSettings, boolean>
  setSettings: Record<keyof BoardSettings, Dispatch<SetStateAction<boolean>>>
}

interface SettingsOptionProps extends ViewProps {
  name: string
  val: boolean
  setVal: Dispatch<SetStateAction<boolean>>
}

const SettingsOption = ({ name, val, setVal, className, ...props }: SettingsOptionProps) => {
  return (
    <View
      className={cn(
        'flex flex-row items-center justify-between gap-5 rounded-2xl bg-gray-300 p-3 shadow-lg shadow-cyan-500/50',
        className
      )}
      {...props}
    >
      <Text className='text-2xl font-bold text-black'>{name}</Text>
      <Switch
        /* trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e" */
        onValueChange={setVal}
        value={val}
      />
    </View>
  )
}

export default function ChessListenSettingsModal({
  visible,
  setVisible,
  settings,
  setSettings,
  className,
  ...props
}: ChessListenSettingsModalProps) {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible)
      }}
    >
      <View className='flex-1 items-center justify-center'>
        <View style={styles.borderAndShadow} className='flex flex-col gap-3 rounded-2xl bg-gray-200 p-5'>
          <Text className='text-center text-3xl font-bold text-gray-700'>Settings</Text>
          <SettingsOption name='Show Board' val={settings.showBoard} setVal={setSettings.showBoard} />
          <SettingsOption name='Show Coordinates' val={settings.showCoordinates} setVal={setSettings.showCoordinates} />
          <Pressable className='rounded-2xl bg-blue-300 p-3' onPress={() => setVisible(!visible)}>
            <Text className='mx-auto my-auto text-xl font-bold text-white'>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

// TODO: make this tailwind, idk why it doesn't work
const styles = StyleSheet.create({
  borderAndShadow: {
    boxShadow: '0 2px 50px black',
  },
})
