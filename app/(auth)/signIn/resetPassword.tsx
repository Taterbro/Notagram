import CustomInput from "@/components/RHF/customInput";
import { typography } from "@/constants/theme";
import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

export default function ForgotPassword() {
  const { colors } = useTheme();
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const initialPassword = useWatch({ control, name: "password" });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const styles = createStyles(colors);

  const onSubmit = (data: any) => {
    setDialogOpen(true);
  };

  return (
    <SafeAreaWrapper style={{ justifyContent: "center" }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Reset your password</Text>
        <Text style={styles.subText}>Create a new password.</Text>
        <ScrollView style={{ gap: 8, height: "50%" }}>
          <CustomInput
            required={true}
            name="password"
            control={control}
            label="New Password"
            isPassword={true}
          />
          <View style={{ height: 8 }} />
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
        </ScrollView>
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          <Text>Reset password</Text>
        </Button>
      </View>

      <Portal>
        <Dialog
          style={{ backgroundColor: colors.background }}
          visible={isDialogOpen}
          onDismiss={() => setDialogOpen(false)}
          dismissable={false}
        >
          <Dialog.Title>Password Reset Successfully</Dialog.Title>
          <Dialog.Content>
            <Text style={{ color: colors.text }}>
              Your password has been reset, you can now log in.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setDialogOpen(false);
                router.replace("/(auth)/signIn/signIn");
              }}
            >
              Log in
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

    subText: {
      fontSize: typography.md,
      color: colors.text,
      marginBottom: 8,
    },
  });
