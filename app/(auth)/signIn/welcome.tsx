import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from "react-native-paper";

export default function WelcomeBack() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const router = useRouter();
  const proceed = () => {
    router.push("/signIn/secretKey");
  };
  return (
    <SafeAreaWrapper>
      <View style={styles.main}>
        <View style={{ alignItems: "center", marginTop: 42 }}>
          <Text style={styles.header}>
            Welcome Back, {"\nName(if they had a name)"}
          </Text>

          <Avatar.Image
            size={180}
            source={{
              uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.p1mZWe9jcwqM8ztIYKYnlQHaHo%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=3715e9de8c43e74379ac2f63692e36c1b3fec98f9fd592eebb578bf37c8f7ecf&ipo=images",
            }}
          />
        </View>

        <Button onPress={proceed} mode="contained">
          Proceed with secret key
        </Button>
      </View>
    </SafeAreaWrapper>
  );
}

const createStyles = (colors: any) => {
  return StyleSheet.create({
    main: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
    },
    header: {
      fontSize: 40,
      color: colors.text,
      textAlign: "center",
      marginBottom: 16,
    },
  });
};
