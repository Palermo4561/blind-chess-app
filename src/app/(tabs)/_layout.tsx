import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  const iconSize = 30

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarIconStyle: { flex: 1 },
      }}
    >
      <Tabs.Screen
        name='games'
        options={{
          title: 'Game Catalogue',
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon='chess-board' color={color} size={iconSize} />,
        }}
      />
      <Tabs.Screen
        name='training'
        options={{
          title: 'Puzzles and Training',
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon='dumbbell' color={color} size={iconSize} />,
        }}
      />
      <Tabs.Screen
        name='index'
        options={{
          title: 'Featured',
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon='chess' color={color} size={iconSize} />,
        }}
      />
      <Tabs.Screen
        name='awards'
        options={{
          title: 'Awards',
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon='trophy' color={color} size={iconSize} />,
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon='gear' color={color} size={iconSize} />,
        }}
      />
    </Tabs>
  )
}
