import { useTheme } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import {
  Image,
  Modal,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";

interface props {
  isModalOpen: boolean;
  onRequestClose: ((event: NativeSyntheticEvent<any>) => void) | undefined;
  activePhoto: DocumentPicker.DocumentPickerAsset;
}

export default function ViewPhotoModal({
  isModalOpen,
  onRequestClose,
  activePhoto,
}: props) {
  const { colors } = useTheme() as any;
  const styles = createStyles(colors);
  return (
    <Modal visible={isModalOpen} onRequestClose={onRequestClose}>
      <View style={styles.modalContent}>
        <Image
          source={{ uri: activePhoto.uri }}
          style={styles.fullImage}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={onRequestClose} style={styles.deleteButton}>
          <XCircleIcon fill={colors.primaryLight} size={"100%"} />
        </TouchableOpacity>
      </View>
      {/* ) : (
        <Text>No Photos selected</Text>
      )} */}
    </Modal>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    fullImage: {
      width: "100%",
      height: "100%",
    },
    modalContent: {
      flex: 1,
      backgroundColor: "black",
      justifyContent: "center",
    },
    deleteButton: {
      position: "absolute",
      top: 4,
      right: 8,
      borderRadius: "100%",
      borderWidth: 1,
      borderColor: "black",
      height: 35,
      width: 35,
      zIndex: 5,
    },
  });
