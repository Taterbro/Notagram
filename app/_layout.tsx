import { darkTheme, lightTheme } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ThemeProvider } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#000");
    NavigationBar.setButtonStyleAsync("light");
  }, []);

  return (
    <ThemeProvider value={theme}>
      <PaperProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="main" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </PaperProvider>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
