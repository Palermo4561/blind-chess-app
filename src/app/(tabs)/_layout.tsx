import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='games'
        options={{
          title: 'Games',
        }}
      />
      <Tabs.Screen
        name='training'
        options={{
          title: 'Training',
        }}
      />
      <Tabs.Screen
        name='index'
        options={{
          title: 'Featured',
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon='chess' color={color} />,
        }}
      />
      <Tabs.Screen
        name='awards'
        options={{
          title: 'Awards',
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
        }}
      />
    </Tabs>
  )
}
