import { Image, StyleSheet, TouchableOpacity } from "react-native";

interface props {
  id: number;
  url: string;
  setActiveImage: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function PostItem({ url, id, setActiveImage }: props) {
  return (
    <TouchableOpacity style={styles.main} onPress={() => setActiveImage(id)}>
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
