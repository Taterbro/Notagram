import ViewPhotoModal from "@/components/viewPhotoModal";
import { typography } from "@/constants/theme";
import { isVideoFile } from "@/utils";
import { useTheme } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { useVideoPlayer, VideoView } from "expo-video";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XCircleIcon,
} from "react-native-heroicons/solid";

interface props {
  photos: DocumentPicker.DocumentPickerAsset[] | null;
  setPhotos: React.Dispatch<
    React.SetStateAction<DocumentPicker.DocumentPickerAsset[] | null>
  >;
  audio: DocumentPicker.DocumentPickerAsset | null;
  isAudioPlaying: boolean;
  pressPlay: () => Promise<void>;
}
export default function PostNavigator({
  photos,
  setPhotos,
  audio,
  isAudioPlaying,
  pressPlay,
}: props) {
  const { colors } = useTheme() as any;
  const styles = createStyles(colors);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const currentImageUri = photos ? photos[activeImage].uri : "";

  const isCurrentVideo = isVideoFile(currentImageUri);

  const videoPlayer = useVideoPlayer(
    isCurrentVideo ? { uri: currentImageUri, useCaching: true } : null,
    (player) => {
      player.loop = true;
      player.play();
    }
  );
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
  const onPhotoButtonClick = (action: 1 | 0) => {
    if (!photos) return;
    if (action === 1 && activeImage + 1 < photos?.length) {
      setActiveImage((prev) => prev + 1);
    } else if (action === 0 && activeImage > 0) {
      setActiveImage((prev) => prev - 1);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={removePhoto} style={styles.deleteButton}>
        <XCircleIcon fill={colors.primaryLight} size={"100%"} />
      </TouchableOpacity>
      <View style={styles.box}>
        {audio && (
          <Pressable onPress={pressPlay} style={styles.playerButton}>
            {isAudioPlaying ? (
              <SpeakerWaveIcon fill={colors.primaryLight} size={"100%"} />
            ) : (
              <SpeakerXMarkIcon fill={colors.primaryLight} size={"100%"} />
            )}
          </Pressable>
        )}
        {isCurrentVideo ? (
          <VideoView
            style={styles.video}
            player={videoPlayer}
            nativeControls={true}
          />
        ) : (
          <Pressable
            style={{ width: "100%", height: "100%" }}
            onPress={() => setModalOpen(true)}
          >
            <Image
              style={styles.photo}
              source={{ uri: photos?.[activeImage].uri }}
            />
          </Pressable>
        )}
      </View>

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

      {photos && isModalOpen && (
        <ViewPhotoModal
          isModalOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          activePhoto={photos[activeImage]}
        />
      )}
    </>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
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
    video: {
      width: "100%",
      height: "100%",
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
