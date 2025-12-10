import CustomInput from "@/components/RHF/customInput";
import { typography } from "@/constants/theme";
import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { PlusCircleIcon, UserIcon } from "react-native-heroicons/solid";
import { Avatar, Button, IconButton } from "react-native-paper";

const screenheight = Dimensions.get("window").height;

export default function NameAndAvatar() {
  const { control } = useForm();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [pfp, setPfp] = useState<string | null>(null);
  const router = useRouter();

  const pickFile = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: ["image/*"],
        multiple: false,
      });
      console.log(doc);
      doc.assets != null && setPfp(doc.assets[0].uri);
    } catch (err) {
      console.log("error while loading file", err);
    }
  };
  const onSubmit = () => {
    //some form validation shit. Different fuction to skip... or not, idk
    router.replace("/main/home");
  };
  return (
    <SafeAreaWrapper>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Text style={styles.lastThing}>One last thing...</Text>
          <View style={styles.main}>
            <Text style={styles.header}>What should we call you?</Text>

            <View style={styles.content}>
              <View>
                {!pfp ? (
                  <Avatar.Icon size={120} icon={UserIcon} />
                ) : (
                  <Avatar.Image size={120} source={{ uri: pfp }} />
                )}
                <IconButton
                  icon={() => <PlusCircleIcon size={40} />}
                  size={24}
                  onPress={pickFile}
                  style={styles.addPicButton}
                />
              </View>

              <CustomInput
                required={true}
                name="name"
                control={control}
                label="Name"
                placeholder="literally anything..."
              />
            </View>
          </View>
        </ScrollView>

        <Button onPress={onSubmit} style={{ marginBottom: 8 }}>
          Upload
        </Button>

        <Text onPress={onSubmit} style={styles.skipText}>
          Skip this step
        </Text>
      </View>
    </SafeAreaWrapper>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    lastThing: {
      fontSize: 20,
      color: colors.text,
      textAlign: "left",
      marginBottom: 64,
    },
    header: {
      fontSize: 24,
      color: colors.text,
      marginBottom: 14,
      textAlign: "center",
    },
    main: {
      width: "100%",
      overflow: "hidden",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    skipText: {
      fontSize: typography.md,
      color: colors.textSecondary,
      textDecorationLine: "underline",
      alignSelf: "center",
    },
    content: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    addPicButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
    },
  });
