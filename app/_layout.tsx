import { darkTheme, lightTheme } from "@/constants/theme";
import { AuthProvider, useAuth } from "@/contexts/authContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ThemeProvider } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";

// Inner component that uses the auth context
function RootLayoutNav() {
  const { userData } = useAuth();
  const isFirstTime = SecureStore.getItem("isFirstTime");

  useEffect(() => {
    console.log("first time is: ", userData);
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={isFirstTime === null}>
        <Stack.Screen name="index" />
      </Stack.Protected>

      <Stack.Protected guard={userData !== null}>
        <Stack.Screen name="main" />
      </Stack.Protected>

      <Stack.Protected guard={userData === null}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

// Outer component that provides the context
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#000");
    NavigationBar.setButtonStyleAsync("light");
  }, []);

  return (
    <ThemeProvider value={theme}>
      <AuthProvider>
        <PaperProvider>
          <RootLayoutNav />
        </PaperProvider>
      </AuthProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
