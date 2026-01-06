import { darkTheme, lightTheme } from "@/constants/theme";
import { AuthProvider, useAuth } from "@/contexts/authContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ThemeProvider } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const { userData } = useAuth();

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#000");
    NavigationBar.setButtonStyleAsync("light");
  }, []);

  return (
    <ThemeProvider value={theme}>
      <AuthProvider>
        <PaperProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Protected guard={userData !== null}>
              <Stack.Screen name="main" />
            </Stack.Protected>

            <Stack.Protected guard={userData === null}>
              <Stack.Screen name="(auth)" />
            </Stack.Protected>
          </Stack>
        </PaperProvider>
      </AuthProvider>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
