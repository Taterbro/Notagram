import { posts } from "@/constants/postsTest";
import { isVideoFile } from "@/utils";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

interface props {
  post: posts;
  url: string;
  setActivePost: React.Dispatch<React.SetStateAction<posts | null>>;
}

export default function PostItem({ url, post, setActivePost }: props) {
  const [thumbnail, setThumbnail] = useState<string>(url);
  useEffect(() => {
    const generateVideoThumbnail = async (videoUri: string) => {
      try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
          time: 15000,
        });
        setThumbnail(uri);
        return uri;
      } catch (e) {
        console.warn(e);
      }
    };
    if (isVideoFile(url)) {
      generateVideoThumbnail(url).then((bees) => console.log("bees: ", bees));
    }
  }, [url]);
  return (
    <TouchableOpacity style={styles.main} onPress={() => setActivePost(post)}>
      <Image style={styles.main_img} source={{ uri: thumbnail }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    aspectRatio: "1/1",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flex: 1,
  },
  main_img: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
});
