// Home stack layout
// Groups the Home screen and its nested screens (e.g. SearchResults)

import { Stack } from "expo-router";

export default function HomeStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="search/[query]" />
    </Stack>
  );
}
