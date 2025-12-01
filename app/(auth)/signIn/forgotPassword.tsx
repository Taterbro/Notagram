import CustomInput from "@/components/RHF/customInput";
import { typography } from "@/constants/theme";
import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

export default function ResetPassword() {
  const { colors } = useTheme();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: "",
    },
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const styles = createStyles(colors);

  const onSubmit = (data: any) => {
    setDialogOpen(true);
  };

  return (
    <SafeAreaWrapper style={{ justifyContent: "center" }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Reset your password</Text>
        <Text style={styles.subText}>
          Enter the email address linked to your account
        </Text>
        <ScrollView style={{ gap: 8, height: "50%" }}>
          <CustomInput
            required={true}
            name="email"
            control={control}
            isEmail={true}
          />
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
          <Dialog.Title>Reset link sent!</Dialog.Title>
          <Dialog.Content>
            <Text style={{ color: colors.text }}>
              Click the link sent to your email address to reset your password
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setDialogOpen(false);
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

    subText: {
      fontSize: typography.md,
      color: colors.text,
      marginBottom: 8,
    },
  });
