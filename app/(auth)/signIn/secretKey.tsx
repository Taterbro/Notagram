import CustomInput from "@/components/RHF/customInput";
import { typography } from "@/constants/theme";
import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

export default function SecretKey() {
  const { colors } = useTheme();
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      code: "",
    },
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const styles = createStyles(colors);
  const message =
    "Please make sure the secret key is correct. You won't be able to view your files if it's not";

  const handleButtonPress = () => {
    router.navigate("/main/home");
  };
  return (
    <SafeAreaWrapper style={{ justifyContent: "center" }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>What's your secret key?</Text>
        <Text style={styles.subText}>{message}</Text>
        <ScrollView style={{ gap: 8, height: "50%" }}>
          <CustomInput
            required={true}
            name="code"
            control={control}
            label="Secret Key"
            rules={{
              minLength: {
                value: 8,
                message: "Your secret key is definitely more than 7 characters",
              },
            }}
          />
        </ScrollView>
        <View>
          <Button mode="contained" onPress={handleSubmit(handleButtonPress)}>
            <Text>Submit</Text>
          </Button>
        </View>
      </View>

      <Portal>
        <Dialog
          style={{ backgroundColor: colors.background }}
          visible={isDialogOpen}
          onDismiss={() => setDialogOpen(false)}
          dismissable={false}
        >
          <Dialog.Title>Success :D</Dialog.Title>
          <Dialog.Content>
            <Text style={{ color: colors.text }}>
              Your Email has been verified
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogOpen(false)}>cool</Button>
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
    resendButton: {
      width: "100%",
      textAlign: "right",
    },

    subText: {
      fontSize: typography.md,
      color: colors.text,
      marginBottom: 8,
    },

    warning: {
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      width: "100%",
    },
  });
