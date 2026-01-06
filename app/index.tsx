import { typography } from "@/constants/theme";
import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export default function LandingPage() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const titleOpacity = useSharedValue(0);
  const subOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }));
  const subTitleStyle = useAnimatedStyle(() => ({
    opacity: subOpacity.value,
  }));
  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));
  useEffect(() => {
    titleOpacity.value = withTiming(1, { duration: 1500 });
    subOpacity.value = withDelay(1700, withTiming(1, { duration: 1500 }));
    buttonOpacity.value = withDelay(4500, withTiming(1, { duration: 1500 }));
  }, []);

  useEffect(() => {
    SecureStore.setItem("isFirstTime", "1");
  }, []);
  return (
    <SafeAreaWrapper>
      <View style={styles.main}>
        <View style={{ alignItems: "center" }}>
          <Animated.Text style={[styles.headerText, animatedStyle]}>
            NOTAGRAM
          </Animated.Text>
          <Animated.Text style={[styles.subText, subTitleStyle]}>
            It's not instagram
          </Animated.Text>
          <Animated.Text
            style={[styles.subText, buttonStyle, { textAlign: "center" }]}
          >
            Also fuck instagram, they sell your data to advertisers
          </Animated.Text>
        </View>
        <View style={{ height: 100 }} />

        <Animated.View style={[styles.buttonWrapper, buttonStyle]}>
          <Button
            mode="outlined"
            onPress={() => router.navigate("/(auth)/signUp/signUp")}
          >
            <Text>Signup</Text>
          </Button>

          <Button
            mode="contained"
            onPress={() => router.navigate("/(auth)/signIn/signIn")}
          >
            <Text>Login</Text>
          </Button>
        </Animated.View>
      </View>
    </SafeAreaWrapper>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    headerText: {
      color: colors.text,
      fontSize: typography.xxl,
    },
    subText: {
      fontSize: typography.md,
      color: colors.textSecondary,
    },
    buttonWrapper: {
      gap: 8,
      flexDirection: "row",
    },
    main: {
      paddingTop: 54,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      backgroundColor: colors.background,
    },
  });
