import ViewPhotoModal from "@/components/viewPhotoModal";
import { posts, testPosts } from "@/constants/postsTest";
import { typography } from "@/constants/theme";
import { Main } from "@/features/editProfile";
import LogoutModal from "@/features/editProfile/logoutModal";
import { PostItem, SinglePostModal } from "@/features/viewPosts";
import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";

export default function HomePage() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [columnNumbers, setColumnNumbers] = useState(3);
  const [activePost, setActivePost] = useState<posts | null>(null);
  const [activePhoto, setActivePhoto] = useState<string | undefined>(undefined);
  const [isAudioMuted, setAudioMuted] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    if (confirmLogout) {
      setEditProfileVisible(false);
    }
  }, [confirmLogout]);

  return (
    <SafeAreaWrapper>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setEditProfileVisible(true)}>
            <View style={styles.pfpNameContainer}>
              <Avatar.Image
                size={40}
                source={{
                  uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.p1mZWe9jcwqM8ztIYKYnlQHaHo%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=3715e9de8c43e74379ac2f63692e36c1b3fec98f9fd592eebb578bf37c8f7ecf&ipo=images",
                }}
              />
              <Text style={styles.userName}>Vi's uploads</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={testPosts}
          key={columnNumbers}
          numColumns={columnNumbers}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PostItem
              setActivePost={setActivePost}
              post={item}
              url={item.images[0]}
            />
          )}
        />
      </View>
      <Main
        setVisible={setEditProfileVisible}
        visible={editProfileVisible}
        setConfirmLogout={setConfirmLogout}
      />
      <LogoutModal
        confirmLogout={confirmLogout}
        setConfirmLogout={setConfirmLogout}
      />

      {activePost && (
        <SinglePostModal
          visible={activePost ? true : false}
          setActivePost={setActivePost}
          activePost={activePost}
          isAudioMuted={isAudioMuted}
          setAudioMuted={setAudioMuted}
          setActivePhoto={setActivePhoto}
        />
      )}
      <ViewPhotoModal
        isModalOpen={activePhoto ? true : false}
        onRequestClose={() => setActivePhoto(undefined)}
        activePhotoUrl={activePhoto}
      />
    </SafeAreaWrapper>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomColor: colors.textSecondary,
      borderBottomWidth: 1,
      paddingVertical: 4,
    },
    pfpNameContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    userName: {
      fontSize: typography.md,
      color: colors.textSecondary,
      marginLeft: 8,
    },
  });
