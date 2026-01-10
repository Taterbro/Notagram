import { markdownStyles } from "@/constants/markdownStyles";
import { typography } from "@/constants/theme";
import { useActivePost } from "@/contexts/activePostContext";
import { isVideoFile } from "@/utils/isVideoFile";
import { useTheme } from "@react-navigation/native";
import { useAudioPlayer } from "expo-audio";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
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
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "react-native-heroicons/solid";
import Markdown from "react-native-markdown-display";
import { SafeAreaView } from "react-native-safe-area-context";

interface props {
  visible: boolean;
  setActivePhoto: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function SinglePostModal({ visible, setActivePhoto }: props) {
  const { colors } = useTheme() as any;
  const styles = createStyles(colors);
  const {
    data: activePost,
    setter: setActivePost,
    isAudioMuted,
    setAudioMuted,
  } = useActivePost();
  const pressPlay = () => {
    if (activePost && isVideoFile(activePost.images[activeImage])) {
      return;
    }
    setAudioMuted((prev) => !prev);
  };
  const audioPlayer = activePost && useAudioPlayer(activePost.audio);
  const [activeImage, setActiveImage] = useState(0);

  const currentImageUri = activePost ? activePost.images[activeImage] : "";
  const isCurrentVideo = isVideoFile(currentImageUri);

  // Only create video player if current image is a video
  const videoPlayer = useVideoPlayer(
    isCurrentVideo ? { uri: currentImageUri, useCaching: true } : null,
    (player) => {
      player.loop = true;
      player.play();
    }
  );

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

  useEffect(() => {
    if (!audioPlayer) {
      return;
    }
    if (isAudioMuted) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  }, [isAudioMuted]);
  useEffect(() => {
    if (
      activePost &&
      audioPlayer &&
      isVideoFile(activePost.images[activeImage]) &&
      !isAudioMuted
    ) {
      setAudioMuted(true);
      audioPlayer.pause();
    }
  }, [activeImage]);

  if (!activePost) {
    return;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setActivePost(null)}
    >
      <SafeAreaView>
        <View style={styles.main}>
          <View style={[styles.top, styles.flexRow]}>
            <TouchableOpacity
              style={{ paddingVertical: 8 }}
              onPress={() => setActivePost(null)}
            >
              <View style={[styles.flexRow, styles.top_back]}>
                <ChevronLeftIcon
                  fill={colors.textSecondary}
                  size={typography.md}
                />
                <Text style={styles.backText}>back</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.postTitle}>{activePost.title}</Text>

          <ScrollView>
            <View style={styles.box}>
              <>
                {activePost.audio && (
                  <Pressable onPress={pressPlay} style={styles.playerButton}>
                    {isAudioMuted ? (
                      <SpeakerXMarkIcon
                        fill={colors.primaryLight}
                        size={"100%"}
                      />
                    ) : (
                      <SpeakerWaveIcon
                        fill={colors.primaryLight}
                        size={"100%"}
                      />
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
                    <Image
                      style={styles.photo}
                      source={{ uri: currentImageUri }}
                    />
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

            <Markdown style={markdownStyles(colors)}>
              {activePost.description}
            </Markdown>
          </ScrollView>
        </View>
      </SafeAreaView>
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
    backText: {
      color: colors.textSecondary,
      fontSize: typography.md,
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

    postTitle: {
      backgroundColor: "transparent",
      color: colors.textSecondary,
      fontSize: typography.xl,
      marginTop: 20,
      marginBottom: 30,
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
    descriptionStyle: {
      color: colors.text,
    },
    video: {
      width: "100%",
      height: "100%",
    },
  });
