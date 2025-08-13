'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'

export type ChessReadingSettings = {
  voice: string | undefined
  extensiveReading: boolean
}

interface SettingsContextType extends ChessReadingSettings {
  setVoice: Dispatch<SetStateAction<string | undefined>>
  setExtensiveReading: Dispatch<SetStateAction<boolean>>
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // letting this be undefined for now, to just use the default voice
  const [voice, setVoice] = useState<string | undefined>(undefined)
  const [extensiveReading, setExtensiveReading] = useState<boolean>(true)

  const value: SettingsContextType = {
    voice,
    setVoice,
    extensiveReading,
    setExtensiveReading,
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
