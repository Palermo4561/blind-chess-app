import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: { flex: 1 },
      }}
    >
      <Tabs.Screen
        name={`listen/[id]`}
        options={{
          title: 'Listen',
        }}
      />
      <Tabs.Screen
        name={`train/[id]`}
        options={{
          title: 'Train',
        }}
      />
    </Tabs>
  )
}
