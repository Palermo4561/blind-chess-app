import React, { useEffect, useMemo, useState } from 'react'
import { Platform, View } from 'react-native'
import Animated from 'react-native-reanimated'

import { fetchGamesForUser } from '@/api/lichess'
import ChessItem from '@/components/ChessItem'
import { LichessGame } from '@/types/lichess'

export default function Awards() {
  const [games, setGames] = useState<LichessGame[]>([])
  const [loadedChessItems, setLoadedChessItems] = useState<React.JSX.Element[]>([])

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGamesForUser('DannytheDonkey', 5)
      setGames(data)
    }
    loadGames()
  }, [])

  useMemo(() => {
    setLoadedChessItems(games.map((game: LichessGame, idx: number) => <ChessItem key={idx} game={game} />))
  }, [games])

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={Platform.select({
        ios: false,
        web: true,
        default: true,
      })}
    >
      {loadedChessItems.map((item, idx) => (
        <View key={idx}>{item}</View>
      ))}
    </Animated.ScrollView>
  )
}
