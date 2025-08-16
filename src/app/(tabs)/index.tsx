import React, { useMemo, useState } from 'react'
import { Platform, View } from 'react-native'
import Animated from 'react-native-reanimated'

import ChessItem from '@/components/ChessItem'
import { useLoadedGamesContext } from '@/contexts/LoadedGamesContext'
import { GameAttributes } from '@/types/lichess'

export default function Awards() {
  const { games } = useLoadedGamesContext()
  const [loadedChessItems, setLoadedChessItems] = useState<React.JSX.Element[]>([])

  useMemo(() => {
    const featuredGames = games.filter((game: GameAttributes) => game.type === 'featured')
    setLoadedChessItems(featuredGames.map((game: GameAttributes, idx: number) => <ChessItem key={idx} game={game} />))
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
