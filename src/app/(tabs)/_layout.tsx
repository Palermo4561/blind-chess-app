import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="games"
        options={{
          title: "Chess Games",
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: "Puzzles & Training",
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Featured",
        }}
      />
      <Tabs.Screen
        name="awards"
        options={{
          title: "Awards",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
