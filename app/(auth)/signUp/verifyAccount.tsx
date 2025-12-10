import CustomInput from "@/components/RHF/customInput";
import { typography } from "@/constants/theme";
import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

export default function VerifyAccount() {
  const { colors } = useTheme();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      code: "",
    },
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [resendTimer, setResendTimer] = useState<null | number>(null);
  const styles = createStyles(colors);
  const router = useRouter();

  const startTimer = () => {
    setResendTimer(59);
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev && prev > 0 ? prev - 1 : null));
    }, 1000);

    return interval;
  };
  useEffect(() => {
    const interval = startTimer();
    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data: any) => {
    setDialogOpen(true);
  };
  return (
    <SafeAreaWrapper style={{ justifyContent: "center" }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Enter verification Code</Text>
        <Text style={styles.subText}>
          Enter the verification code sent to your email address
        </Text>
        <ScrollView style={{ gap: 8, height: "50%" }}>
          <CustomInput
            required={true}
            name="code"
            control={control}
            label="Verification code"
          />
          <TouchableOpacity
            disabled={resendTimer != null && resendTimer > 0}
            style={styles.resendButton}
            onPress={startTimer}
          >
            <Text style={styles.resendText}>
              {resendTimer != null && resendTimer > 0
                ? `Resend in ${resendTimer}s`
                : "Resend Code"}
            </Text>
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
          dismissable={false}
        >
          <Dialog.Title>Success :D</Dialog.Title>
          <Dialog.Content>
            <Text style={{ color: colors.text }}>
              Your Email has been verified
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setDialogOpen(false);
                router.replace("/(auth)/signUp/secretKey");
              }}
            >
              cool
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
    resendButton: {
      width: "100%",
      textAlign: "right",
    },
    resendText: {
      fontSize: typography.sm,
      color: colors.textSecondary,

      textDecorationLine: "underline",
    },
    subText: {
      fontSize: typography.md,
      color: colors.text,
      marginBottom: 8,
    },
  });
