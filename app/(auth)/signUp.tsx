import { typography } from "@/constants/theme";
import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

export default function Signup() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <SafeAreaWrapper style={{ justifyContent: "center" }}>
      <View>
        <Text style={styles.title}>Create an account</Text>
      </View>
    </SafeAreaWrapper>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    title: {
      fontSize: typography.xl,
      color: "white",
      marginBottom: 64,
    },
  });
