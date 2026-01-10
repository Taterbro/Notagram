import { typography } from "@/constants/theme";
import { useActivePost } from "@/contexts/activePostContext";
import { isVideoFile } from "@/utils";
import { useTheme } from "@react-navigation/native";
import { VideoView, useVideoPlayer } from "expo-video";
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
} from "react-native-heroicons/solid";

interface props {
  setActivePhoto: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export default function PostNavigator({ setActivePhoto }: props) {
  const { data: activePost, isAudioMuted, setAudioMuted } = useActivePost();
  const { colors } = useTheme() as any;
  const styles = createStyles(colors);
  const [activeImage, setActiveImage] = useState(0);
  const currentImageUri = activePost ? activePost.images[activeImage] : "";
  const isCurrentVideo = isVideoFile(currentImageUri);

  const videoPlayer = useVideoPlayer(
    isCurrentVideo ? { uri: currentImageUri, useCaching: true } : null,
    (player) => {
      player.loop = true;
      player.play();
    }
  );
  const pressPlay = () => {
    if (activePost && isVideoFile(activePost.images[activeImage])) {
      return;
    }
    setAudioMuted((prev) => !prev);
  };
  const onPhotoButtonClick = (action: 1 | 0) => {
    if (!activePost) {
      return;
    }
    if (action === 1 && activeImage + 1 < activePost.images.length) {
      setActiveImage((prev) => prev + 1);
    } else if (action === 0 && activeImage > 0) {
      setActiveImage((prev) => prev - 1);
    }
  };

  if (!activePost) {
    return;
  }
  return (
    <>
      <View style={styles.box}>
        <>
          {activePost.audio && (
            <Pressable onPress={pressPlay} style={styles.playerButton}>
              {isAudioMuted ? (
                <SpeakerXMarkIcon fill={colors.primaryLight} size={"100%"} />
              ) : (
                <SpeakerWaveIcon fill={colors.primaryLight} size={"100%"} />
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
              onPress={() => setActivePhoto(currentImageUri)}
            >
              <Image style={styles.photo} source={{ uri: currentImageUri }} />
            </Pressable>
          )}
        </>
      </View>

      <View style={styles.photoNav}>
        <TouchableOpacity
          onPress={() => onPhotoButtonClick(0)}
          style={styles.photoNav_buttons}
        >
          <ChevronLeftIcon fill={colors.textSecondary} size={20} />
        </TouchableOpacity>
        <Text style={styles.photoNav_text}>{`${activeImage + 1}/${
          activePost.images.length || "1"
        }`}</Text>
        <TouchableOpacity
          onPress={() => onPhotoButtonClick(1)}
          style={styles.photoNav_buttons}
        >
          <ChevronRightIcon fill={colors.textSecondary} size={20} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    flexRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
    box_touch: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
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
    playerButton: {
      position: "absolute",
      bottom: 4,
      left: 8,
      borderRadius: "100%",
      height: 35,
      width: 35,
      zIndex: 5,
    },
    video: {
      width: "100%",
      height: "100%",
    },
  });
