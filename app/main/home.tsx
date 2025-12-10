import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "react-native";

export default function HomePage() {
  const { colors } = useTheme();
  return (
    <SafeAreaWrapper>
      <View>
        <Text style={{ color: colors.text }}>Le content fr fr</Text>
      </View>
    </SafeAreaWrapper>
  );
}
