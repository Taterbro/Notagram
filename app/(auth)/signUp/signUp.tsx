import CustomInput from "@/components/RHF/customInput";
import { typography } from "@/constants/theme";
import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

export default function Signup() {
  const { colors } = useTheme();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const initialPassword = useWatch({ name: "password", control: control });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const styles = createStyles(colors);
  const router = useRouter();
  const onSubmit = (data: any) => {
    setDialogOpen(true);
  };

  return (
    <SafeAreaWrapper style={{ justifyContent: "center" }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Create an account</Text>
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
          <CustomInput
            required={true}
            name="confirmPassword"
            control={control}
            label="Confirm Password"
            isPassword={true}
            rules={{
              validate: (value) =>
                value != initialPassword ? "Passwords do not match" : undefined,
            }}
          />

          <TouchableOpacity
            style={{ alignSelf: "flex-start", paddingVertical: 8 }}
            onPress={() => router.replace("/(auth)/signIn/signIn")}
          >
            <Text style={styles.loginText}>Login instead?</Text>
          </TouchableOpacity>
        </ScrollView>
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          <Text>Submit</Text>
        </Button>
      </View>

      <Portal>
        <Dialog
          style={{ backgroundColor: colors.background }}
          visible={isDialogOpen}
          onDismiss={() => setDialogOpen(false)}
        >
          <Dialog.Title>Account created.</Dialog.Title>
          <Dialog.Content>
            <Text style={{ color: colors.text }}>
              Your account was created Successfully. Please verify your email
              address
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setDialogOpen(false);
                router.navigate("/signUp/verifyAccount");
              }}
            >
              Ok
            </Button>
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
    loginText: {
      fontSize: typography.sm,
      color: colors.textSecondary,
      textDecorationLine: "underline",
    },
  });
