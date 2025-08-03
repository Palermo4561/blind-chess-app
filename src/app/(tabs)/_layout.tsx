import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Tabs } from 'expo-router'

import { MAIN_PAGE_TAB_KEYS as TAB_KEYS } from '@/constants/pages'
import { MainPageIconKeyOptions as IconKeyOptions } from '@/types/pages'

const KEY_ICON_MAP: Record<IconKeyOptions, IconProp> = {
  games: 'chess-board',
  training: 'dumbbell',
  index: 'chess',
  awards: 'trophy',
  settings: 'gear',
}

interface TabBarIconProps {
  color: string
  iconKey: IconKeyOptions
  focused: boolean
  iconScale: { baseSize: number; hoverIncrease: number }
}

const TabBarIcon = ({ color, iconKey, focused, iconScale }: TabBarIconProps) => {
  let size = iconScale.baseSize * (focused ? iconScale.hoverIncrease : 1)

  return <FontAwesomeIcon icon={KEY_ICON_MAP[iconKey]} color={color} size={size} />
}

export default function TabLayout() {
  const iconScale = {
    baseSize: 30,
    hoverIncrease: 1.2,
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarIconStyle: { flex: 1 },
        headerShown: false,
      }}
    >
      {TAB_KEYS.map((iconKey, idx) => (
        <Tabs.Screen
          key={idx}
          name={iconKey}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon iconKey={iconKey} color={color} focused={focused} iconScale={iconScale} />
            ),
          }}
        />
      ))}
    </Tabs>
  )
}
