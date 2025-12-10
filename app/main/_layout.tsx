import { Stack } from "expo-router";

export default function Index() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="addPost" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
