'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'

type ListeningTrainingSplit = {
  listening: boolean
  training: boolean
}

export type ChessReadingSettings = {
  voice: string | undefined
  extensiveReading: boolean
}

export type BoardSettings = {
  showBoard: ListeningTrainingSplit
  showCoordinates: ListeningTrainingSplit
}

interface SettingsContextType extends ChessReadingSettings, BoardSettings {
  setVoice: Dispatch<SetStateAction<string | undefined>>
  setExtensiveReading: Dispatch<SetStateAction<boolean>>
  setShowBoard: Dispatch<SetStateAction<ListeningTrainingSplit>>
  setShowCoordinates: Dispatch<SetStateAction<ListeningTrainingSplit>>
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const defaultListeningTrainingSplit = { listening: true, training: true }

  const [voice, setVoice] = useState<string | undefined>(undefined)
  const [extensiveReading, setExtensiveReading] = useState<boolean>(true)
  const [showBoard, setShowBoard] = useState<ListeningTrainingSplit>(defaultListeningTrainingSplit)
  const [showCoordinates, setShowCoordinates] = useState<ListeningTrainingSplit>(defaultListeningTrainingSplit)

  const value: SettingsContextType = {
    voice,
    setVoice,
    extensiveReading,
    setExtensiveReading,
    showBoard,
    setShowBoard,
    showCoordinates,
    setShowCoordinates,
  }

  return <SettingsContext value={value}>{children}</SettingsContext>
}

export const useSettingsContext = () => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettingsContext must be used within a DataProvider')
  }
  return context
}
