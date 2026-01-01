import { typography } from "@/constants/theme";
import { Main } from "@/features/editProfile";
import { SafeAreaWrapper } from "@/hoc/SafeAreaWrapper";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Squares2X2Icon } from "react-native-heroicons/solid";
import { Avatar, IconButton } from "react-native-paper";

export default function HomePage() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [viewMode, setViewMode] = useState<"grid" | "single">("grid");
  const [editProfileVisible, setEditProfileVisible] = useState(false);

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

          {viewMode === "single" && (
            <IconButton size={24} icon={Squares2X2Icon} />
          )}
        </View>

        <ScrollView></ScrollView>
      </View>
      <Main
        setVisible={setEditProfileVisible}
        visible={editProfileVisible}
      ></Main>
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
