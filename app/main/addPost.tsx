import ViewPhotoModal from "@/components/viewPhotoModal";
import { typography } from "@/constants/theme";
import { MAX_PHOTOS_UPLOAD } from "@/constants/variables";
import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import { useAudioPlayer } from "expo-audio";
import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotoIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XCircleIcon,
} from "react-native-heroicons/solid";
import { Button, TextInput } from "react-native-paper";

export default function AddPost() {
  const { colors } = useTheme() as any;
  const [photos, setPhotos] = useState<
    DocumentPicker.DocumentPickerAsset[] | null
  >(null);
  const [audio, setAudio] = useState<DocumentPicker.DocumentPickerAsset | null>(
    null
  );
  const [description, setDescription] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [hasPhotos, setHasPhotos] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const styles = createStyles(colors);
  const audioPlayer = useAudioPlayer(audio?.uri);
  const [isAudioPlaying, setAudioPlaying] = useState(false);

  const uploadButtonClicked = () => {
    if (photos) {
      Alert.alert("Message", "uploaded successfully");
    } else {
      Alert.alert("No Files Selected", "Select something first, big dawg");
    }
  };

  const pickFile = async () => {
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
  const pickAudio = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: ["audio/*"],
        multiple: false,
      });
      if (doc.canceled || doc.assets === null) return;
      const audioFile = doc.assets[0];
      if (audioPlayer.playing) {
        setAudioPlaying(false);
        audioPlayer.pause();
        setAudio(audioFile);
      }
      setAudio(audioFile);
    } catch (err) {
      console.log("error while loading file", err);
    }
  };
  const onPhotoButtonClick = (action: 1 | 0) => {
    if (!photos) return;
    if (action === 1 && activeImage + 1 < photos?.length) {
      setActiveImage((prev) => prev + 1);
    } else if (action === 0 && activeImage > 0) {
      setActiveImage((prev) => prev - 1);
    }
  };
  const removePhoto = () => {
    if (!photos) return;

    setPhotos((prev) => {
      if (!prev) return null;
      const newPhotos = prev.filter((_, index) => index !== activeImage);

      // If we removed all photos, return null
      if (newPhotos.length === 0) return null;

      // If active image is now out of bounds, adjust it
      if (activeImage >= newPhotos.length) {
        setActiveImage(newPhotos.length - 1);
      }

      return newPhotos;
    });
  };
  const pressPlay = async () => {
    if (
      Math.floor(audioPlayer.currentTime) === Math.floor(audioPlayer.duration)
    ) {
      audioPlayer
        .seekTo(0)
        .then(() => {
          audioPlayer.play();
          setAudioPlaying(true);
        })
        .catch(() => console.log("no"));
    }
    if (audioPlayer.playing) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    setAudioPlaying(audioPlayer.playing);
  };

  useEffect(() => {
    photos && photos.length > 0 ? setHasPhotos(true) : setHasPhotos(false);
  }, [photos]);
  useEffect(() => {
    if (audio) {
      audioPlayer.play();
      setAudioPlaying(true);
    }
  }, [audio]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        Math.floor(audioPlayer.currentTime) === Math.floor(audioPlayer.duration)
      ) {
        setAudioPlaying(false);
        // Audio finished playing
      }
    }, 100); // Check every 100ms

    return () => clearInterval(interval);
  }, [audioPlayer]);
  return (
    //TO DO: Make this a scrollView so it can accomodate a keyboard
    <SafeAreaWrapper>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add a Post</Text>
      </View>

      <View
        style={photos ? styles.uploadContainer_photos : styles.uploadContainer}
      >
        {photos && (
          <TextInput
            style={styles.postTitle}
            placeholder="Add a Title(optional)"
            onChangeText={(e) => {
              setTitle(e);
            }}
            value={title}
          />
        )}

        <Button
          onPress={uploadButtonClicked}
          mode="contained"
          style={{ marginBottom: 8 }}
        >
          <Text>Upload</Text>
        </Button>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View style={styles.box}>
            {hasPhotos ? (
              <>
                {audio && (
                  <Pressable onPress={pressPlay} style={styles.playerButton}>
                    {isAudioPlaying ? (
                      <SpeakerWaveIcon
                        fill={colors.primaryLight}
                        size={"100%"}
                      />
                    ) : (
                      <SpeakerXMarkIcon
                        fill={colors.primaryLight}
                        size={"100%"}
                      />
                    )}
                  </Pressable>
                )}
                <TouchableOpacity
                  onPress={removePhoto}
                  style={styles.deleteButton}
                >
                  <XCircleIcon fill={colors.primaryLight} size={"100%"} />
                </TouchableOpacity>
                <Pressable
                  style={{ width: "100%", height: "100%" }}
                  onPress={() => setModalOpen(true)}
                >
                  <Image
                    style={styles.photo}
                    source={{ uri: photos?.[activeImage].uri }}
                  />
                </Pressable>
              </>
            ) : (
              <TouchableOpacity style={styles.box_touch} onPress={pickFile}>
                <PhotoIcon
                  fill={colors.primaryLight}
                  opacity={0.7}
                  size={"70%"}
                />
              </TouchableOpacity>
            )}
          </View>

          {hasPhotos && (
            <>
              <View style={styles.photoNav}>
                <TouchableOpacity
                  onPress={() => onPhotoButtonClick(0)}
                  style={styles.photoNav_buttons}
                >
                  <ChevronLeftIcon fill={colors.textSecondary} size={20} />
                </TouchableOpacity>
                <Text style={styles.photoNav_text}>{`${activeImage + 1}/${
                  photos?.length || "1"
                }`}</Text>
                <TouchableOpacity
                  onPress={() => onPhotoButtonClick(1)}
                  style={styles.photoNav_buttons}
                >
                  <ChevronRightIcon fill={colors.textSecondary} size={20} />
                </TouchableOpacity>
              </View>

              <View style={styles.buttonsContainer}>
                {audio ? (
                  <TouchableOpacity onPress={pickAudio}>
                    <Text style={styles.addPhotosText}>
                      {audio.name.slice(0, 30).trim() + "..."}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Button mode="outlined" onPress={pickAudio}>
                    <Text>Add audio</Text>
                  </Button>
                )}
                <TouchableOpacity onPress={pickFile}>
                  <Text style={styles.addPhotosText}>Add more files</Text>
                </TouchableOpacity>
              </View>
            </>
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
        </ScrollView>
      </KeyboardAvoidingView>

      {photos && (
        <ViewPhotoModal
          isModalOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          activePhoto={photos[activeImage]}
        />
      )}
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
    uploadContainer_photos: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
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
      position: "relative",
    },
    postTitle: {
      backgroundColor: "transparent",
      color: colors.text,
      fontSize: typography.xl,
    },
    box_touch: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },

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
    photoNav: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    photoNav_text: {
      color: colors.textSecondary,
      fontSize: typography.md,
    },
    photoNav_buttons: {
      padding: 4,
      borderWidth: 1,
      borderColor: colors.textSecondary,
      borderRadius: 4,
    },
    photo: {
      objectFit: "cover",
      width: "100%",
      height: "100%",
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
    playerButton: {
      position: "absolute",
      bottom: 4,
      left: 8,
      borderRadius: "100%",
      height: 35,
      width: 35,
      zIndex: 5,
    },
  });
