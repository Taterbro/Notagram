import { typography } from "@/constants/theme";
import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PhotoIcon } from "react-native-heroicons/solid";
import { Button, TextInput } from "react-native-paper";

export default function AddPost() {
  const { colors } = useTheme() as any;
  const [photos, setPhotos] = useState<
    DocumentPicker.DocumentPickerAsset[] | null
  >(null);
  const [description, setDescription] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [hasPhotos, setHasPhotos] = useState(false);
  const styles = createStyles(colors);

  const uploadButtonClicked = () => {
    if (photos) {
      Alert.alert("message", "uploaded successfully");
    } else {
      Alert.alert("message", "select photos first, big dawg");
    }
  };

  const pickFile = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "video/*"],
        multiple: true,
      });
      console.log(doc);
      doc.assets != null && setPhotos(doc.assets);
    } catch (err) {
      console.log("error while loading file", err);
    }
  };
  useEffect(() => {
    photos && photos.length > 0 ? setHasPhotos(true) : setHasPhotos(false);
  }, [photos]);
  return (
    //TO DO: Make this a scrollView so it can accomodate a keyboard
    <SafeAreaWrapper>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add a Post</Text>
      </View>

      <View style={styles.uploadContainer}>
        <Button
          onPress={uploadButtonClicked}
          mode="contained"
          style={{ marginBottom: 8 }}
        >
          <Text>Upload</Text>
        </Button>
      </View>

      <TouchableOpacity onPress={pickFile}>
        <View style={styles.box}>
          <PhotoIcon fill={colors.primaryLight} opacity={0.7} size={"70%"} />
        </View>
      </TouchableOpacity>

      {hasPhotos && (
        <View style={styles.buttonsContainer}>
          <Button mode="outlined">
            <Text>Add music</Text>
          </Button>

          <TouchableOpacity>
            <Text style={styles.addPhotosText}>Add more files</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ height: 32 }} />

      <TextInput
        placeholder="Type something..."
        multiline
        value={description}
        onChangeText={setDescription}
        scrollEnabled
        numberOfLines={20}
      ></TextInput>
    </SafeAreaWrapper>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    header: {
      justifyContent: "space-between",
      borderBottomColor: colors.textSecondary,
      borderBottomWidth: 1,
      paddingVertical: 4,
      marginBottom: 8,
    },
    uploadContainer: {
      width: "100%",
      alignItems: "flex-end",
    },
    box: {
      borderWidth: 1,
      borderColor: colors.textSecondary,
      aspectRatio: "1/1",
      minWidth: "100%",
      minHeight: "auto",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,
    },
    boxNoContent: {},
    headerTitle: {
      fontSize: typography.md,
      color: colors.textSecondary,
      marginLeft: 8,
    },
    addFileText: {
      color: colors.text,
      fontSize: typography.lg,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    addPhotosText: {
      fontSize: typography.sm,
      color: colors.textSecondary,
      textDecorationLine: "underline",
    },
  });
