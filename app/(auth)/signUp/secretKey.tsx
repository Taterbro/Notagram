import CustomInput from "@/components/RHF/customInput";
import { typography } from "@/constants/theme";
import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ExclamationTriangleIcon } from "react-native-heroicons/solid";
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
  const [activeMessageIndex, setActiveMessageIndex] = useState<number>(0);
  const messages = [
    "To make sure NO ONE(not even me) can access your data, this key will be used to lock(encrypt) all your data before it's sent to the cloud and this key is known to only you.",
    "Please store your secret key somewhere safe. If you lose it, you can't recover your photos or anything you upload",
    "Seriously. Write it down in a book or something, because if it's gone, it's gone and I can't do anything about that",
    "Do I make myself PERFECTLY CLEAR that you WILL lose EVERYTHING if you lose your secret key!!?",
  ];
  const buttonText = [
    "Create Key",
    "Okay",
    "I understand",
    "I get it, now shut up.",
  ];

  const handleButtonPress = () => {
    if (activeMessageIndex >= 3) {
      router.navigate("/(auth)/signUp/avatar");
    } else {
      console.log("display a toast, future vic.");
      setActiveMessageIndex((prev) => prev + 1);
    }
  };
  return (
    <SafeAreaWrapper style={{ justifyContent: "center" }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Create a secret key</Text>
        <Text style={styles.subText}>{messages[0]}</Text>
        <ScrollView style={{ gap: 8, height: "50%" }}>
          <CustomInput
            required={true}
            name="code"
            control={control}
            label="Secret Key"
            rules={{
              minLength: {
                value: 8,
                message: "Please make it at least 8 characters long.",
              },
            }}
          />
        </ScrollView>
        <View>
          {activeMessageIndex > 0 && (
            <View style={styles.warning}>
              <ExclamationTriangleIcon size={35} fill={"#F1C40F"} />
              <Text style={[{ textAlign: "center" }, styles.subText]}>
                {messages[activeMessageIndex]}
              </Text>
            </View>
          )}
          <Button mode="contained" onPress={handleSubmit(handleButtonPress)}>
            <Text>{buttonText[activeMessageIndex]}</Text>
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
