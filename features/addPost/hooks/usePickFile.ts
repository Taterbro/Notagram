import { MAX_PHOTOS_UPLOAD } from "@/constants/variables";
import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";

const usePickFile = async (
  photos: DocumentPicker.DocumentPickerAsset[] | null,
  setPhotos: React.Dispatch<
    React.SetStateAction<DocumentPicker.DocumentPickerAsset[] | null>
  >
) => {
  if (photos && photos?.length >= MAX_PHOTOS_UPLOAD) return;
  try {
    const doc = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "video/*"],
      multiple: true,
    });
    if (doc.canceled || doc.assets === null) return;
    let newPhotos = [];

    if (photos) {
      if (doc.assets.length + photos?.length >= MAX_PHOTOS_UPLOAD) {
        const availableSpace = MAX_PHOTOS_UPLOAD - photos.length;
        newPhotos = [...photos, ...doc.assets.slice(0, availableSpace)];
        setPhotos(newPhotos);
        Alert.alert(
          "Too many files.",
          "You can only select a maximum of 8 files"
        );
      } else if (doc.assets.length + photos?.length < MAX_PHOTOS_UPLOAD) {
        newPhotos = [...photos, ...doc.assets];
        setPhotos(newPhotos);
      }
    }

    if (photos === null) {
      if (doc.assets.length >= MAX_PHOTOS_UPLOAD) {
        newPhotos = [...doc.assets.slice(0, MAX_PHOTOS_UPLOAD)];
        setPhotos(newPhotos);
        Alert.alert(
          "Too many files.",
          "You can only select a maximum of 8 files"
        );
      } else if (doc.assets.length < MAX_PHOTOS_UPLOAD) {
        setPhotos(doc.assets);
      }
    }
  } catch (err) {
    console.log("error while loading file", err);
  }
};

export default usePickFile;
