import { typography } from "@/constants/theme";
import { useTheme } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { Avatar, Button } from "react-native-paper";
import PasswordForm, { PasswordFormRef } from "./passwordForm";

interface props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Main({ visible, setVisible }: props) {
  const { colors } = useTheme() as any;
  const styles = createStyles(colors);
  //grab user details from storage and set this to name when page first mounts.
  const [username, setUsername] = useState("Vic");
  const [changesMade, setChangesMade] = useState(false);
  const [isPasswordForm, setPasswordForm] = useState(false);
  const formRef = useRef<PasswordFormRef>(null);
  const [selectedPfp, setSelectedPfp] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const handleExternalSubmit = () => {
    formRef.current?.submit();
  };

  const handleSubmit = () => {
    if (changesMade) {
      console.log("Edited user details");
    }
    if (isPasswordForm) {
      handleExternalSubmit();
    }
  };

  const selectPfp = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: ["image/*"],
        multiple: false,
      });
      if (doc.canceled || doc.assets === null) return;
      setSelectedPfp(doc.assets[0]);
      setChangesMade(true);
    } catch (err) {
      console.log("error while loading file", err);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.main}>
        <View style={[styles.top, styles.flexRow]}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <View style={[styles.flexRow, styles.top_back]}>
              <ChevronLeftIcon
                fill={colors.textSecondary}
                size={typography.md}
              />
              <Text style={styles.backText}>back</Text>
            </View>
          </TouchableOpacity>

          <Button mode="contained" style={{ backgroundColor: colors.error }}>
            <Text style={{ color: "white" }}>Logout</Text>
          </Button>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.content}>
            <View style={{ alignItems: "center" }}>
              <View style={{ position: "relative" }}>
                <TouchableOpacity onPress={selectPfp} style={styles.addButton}>
                  <PlusCircleIcon fill={colors.primary} size={50} />
                </TouchableOpacity>
                <Avatar.Image
                  size={180}
                  source={{
                    uri:
                      selectedPfp?.uri ||
                      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.p1mZWe9jcwqM8ztIYKYnlQHaHo%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=3715e9de8c43e74379ac2f63692e36c1b3fec98f9fd592eebb578bf37c8f7ecf&ipo=images",
                  }}
                />
              </View>

              <TextInput
                style={styles.userName}
                onChangeText={(e) => {
                  setUsername(e);
                }}
                value={username}
              />
            </View>

            {isPasswordForm && <PasswordForm ref={formRef} />}

            <View
              style={[
                styles.flexRow,
                {
                  width: "100%",
                  paddingHorizontal: 10,
                  alignItems: "flex-end",
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => setPasswordForm((prev) => !prev)}
              >
                <Text style={styles.passwordText}>
                  {isPasswordForm ? "Cancel" : "Change password"}
                </Text>
              </TouchableOpacity>

              {(changesMade || isPasswordForm) && (
                <Button onPress={handleSubmit} mode="contained">
                  <Text>Save Changes</Text>
                </Button>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    main: {
      backgroundColor: colors.backgroundAlt,
      paddingVertical: 10,
      paddingHorizontal: 10,
      height: "100%",
    },
    text: {
      color: colors.text,
    },
    userName: {
      backgroundColor: "transparent",
      color: colors.text,
      fontSize: typography.xl,
    },
    flexRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    top: {
      width: "100%",
      borderBottomColor: colors.textSecondary,
      borderBottomWidth: 1,
      paddingVertical: 4,
    },
    top_back: {
      gap: 4,
    },
    backText: {
      color: colors.textSecondary,
      fontSize: typography.md,
    },
    logoutText: {
      color: colors.error,
      fontSize: typography.md,
    },
    content: {
      justifyContent: "space-evenly",
      alignItems: "center",
      width: "100%",
      minHeight: "100%",
    },
    passwordText: {
      fontSize: typography.sm,
      color: colors.textSecondary,
      textDecorationLine: "underline",
    },
    addButton: {
      position: "absolute",
      bottom: 5,
      right: 5,
      zIndex: 3,
    },
  });
