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

const KEY_TITLE_MAP: Record<IconKeyOptions, string> = {
  games: 'Game Catalogue',
  training: 'Training & Puzzles',
  index: 'Featured Chess',
  awards: 'Awards & Stats',
  settings: 'Settings',
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

interface HeaderIconProps {
  icon: IconProp
  size?: number
}

const HeaderIcon = ({ icon, size = 30 }: HeaderIconProps) => {
  return <FontAwesomeIcon color='gray' icon={icon} size={size} style={{ marginLeft: 10, marginRight: 10 }} />
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
        headerLeft: () => <HeaderIcon icon='user' />,
        headerRight: () => <HeaderIcon icon='bell' />,
      }}
    >
      {TAB_KEYS.map((iconKey, idx) => (
        <Tabs.Screen
          key={idx}
          name={iconKey}
          options={{
            title: KEY_TITLE_MAP[iconKey],
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon iconKey={iconKey} color={color} focused={focused} iconScale={iconScale} />
            ),
          }}
        />
      ))}
    </Tabs>
  )
}
