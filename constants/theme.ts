/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

const darkColors = {
  primary: "#6C4FC3",
  primaryDark: "#4A3594",
  primaryLight: "#8B72D9",
  background: "#0F0F14",
  backgroundAlt: "#181824",
  text: "#FFFFFF",
  textSecondary: "#A8A2C9",
  textMuted: "#706B8D",
  border: "#2A263F",
  borderLight: "#3A3455",
  success: "#4CD3AA",
  warning: "#F6C85F",
  error: "#EB5C74",
  accent: "#9F87FF",
  overlay: "rgba(15, 15, 20, 0.7)",
  tabIconDefault: "#706B8D",
  tabIconSelected: "#9F87FF",
};

const lightColors = {
  primary: "#6C4FC3",
  primaryDark: "#4A3594",
  primaryLight: "#9F87FF",
  background: "#FAFAFA",
  backgroundAlt: "#F0EFF5",
  text: "#1A1A1A",
  textSecondary: "#5E5A75",
  textMuted: "#8B87A0",
  border: "#E5E2F0",
  borderLight: "#F0EDF7",
  success: "#2FAA88",
  warning: "#E5A326",
  error: "#D93F5C",
  accent: "#7C5FD9",
  overlay: "rgba(250, 250, 250, 0.85)",
  tabIconDefault: "#8B87A0",
  tabIconSelected: "#6C4FC3",
};

export const darkTheme = {
  ...MD3DarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...NavigationDarkTheme.colors,
    ...darkColors,
    // Ensure React Navigation required colors
    primary: darkColors.primary,
    background: darkColors.background,
    card: darkColors.backgroundAlt,
    text: darkColors.text,
    border: darkColors.border,
    notification: darkColors.accent,
  },
};

export const lightTheme = {
  ...MD3LightTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...lightColors,
    // Ensure React Navigation required colors
    primary: lightColors.primary,
    background: lightColors.background,
    card: lightColors.backgroundAlt,
    text: lightColors.text,
    border: lightColors.border,
    notification: lightColors.accent,
  },
};
export const Colors = {
  dark: darkColors,
  light: lightColors,
};
export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const typography = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 42,
};
