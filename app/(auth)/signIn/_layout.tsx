import { Stack } from "expo-router";

export default function Index() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="signIn" />
      <Stack.Screen name="forgotPassword" />
      <Stack.Screen name="resetPassword" />
    </Stack>
  );
}
