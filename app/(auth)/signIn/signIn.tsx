import CustomInput from "@/components/RHF/customInput";
import { typography } from "@/constants/theme";
import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

export default function SignIn() {
  const { colors } = useTheme();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const styles = createStyles(colors);
  const router = useRouter();

  const onSubmit = (data: any) => {
    setDialogOpen(true);
  };
  const randomMessage = Math.floor(Math.random() * 2);
  const welcomeMessages = ["Welcome Back", "Hi again", "Glad to have you back"];

  return (
    <SafeAreaWrapper style={{ justifyContent: "center" }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{welcomeMessages[randomMessage]}</Text>
        <ScrollView style={{ gap: 8, height: "50%" }}>
          <CustomInput
            required={true}
            name="email"
            control={control}
            label="Email"
            isEmail={true}
          />
          <CustomInput
            required={true}
            name="password"
            control={control}
            label="Password"
            isPassword={true}
          />
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.navigate("/(auth)/signIn/forgotPassword")}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </ScrollView>
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          <Text>Login</Text>
        </Button>
      </View>

      <Portal>
        <Dialog
          style={{ backgroundColor: colors.background }}
          visible={isDialogOpen}
          onDismiss={() => setDialogOpen(false)}
        >
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text style={{ color: colors.text }}>
              Successfully submitted, bro
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogOpen(false)}>Ok, big bro</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaWrapper>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    title: {
      fontSize: typography.xl,
      color: colors.text,
      marginBottom: 64,
    },
    forgotText: {
      fontSize: typography.sm,
      color: colors.textSecondary,

      textDecorationLine: "underline",
    },
    linkButton: {
      width: "100%",
      textAlign: "right",
    },
  });
