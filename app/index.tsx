import { typography } from "@/constants/theme";
import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function LandingPage() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <SafeAreaWrapper>
      <View style={styles.main}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.headerText}>NOTAGRAM</Text>
          <Text style={styles.subText}>It's not instagram</Text>
          <Text style={{ ...styles.subText, textAlign: "center" }}>
            Also fuck instagram, they sell your data to advertisers
          </Text>
        </View>
        <View style={{ height: 100 }} />

        <View style={styles.buttonWrapper}>
          <Button
            mode="contained"
            onPress={() => router.navigate("/(auth)/signIn")}
          >
            <Text>Login</Text>
          </Button>

          <Button
            mode="outlined"
            onPress={() => router.navigate("/(auth)/signUp")}
          >
            <Text>Signup</Text>
          </Button>
        </View>
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
