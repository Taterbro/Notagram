import { posts } from "@/constants/postsTest";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

interface props {
  post: posts;
  url: string;
  setActivePost: React.Dispatch<React.SetStateAction<posts | null>>;
}

export default function PostItem({ url, post, setActivePost }: props) {
  return (
    <TouchableOpacity style={styles.main} onPress={() => setActivePost(post)}>
      <Image style={styles.main_img} source={{ uri: url }} />
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
