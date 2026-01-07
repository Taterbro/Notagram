import { typography } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

interface props {
  confirmLogout: boolean;
  setConfirmLogout: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LogoutModal({
  confirmLogout,
  setConfirmLogout,
}: props) {
  const { colors } = useTheme() as any;
  const { setter } = useAuth();
  const styles = createStyles(colors);
  const handleLogout = async () => {
    setter(null);
  };
  return (
    <Portal>
      <Dialog
        style={{ backgroundColor: colors.background }}
        visible={confirmLogout}
        onDismiss={() => setConfirmLogout(false)}
        dismissable={true}
      >
        <Dialog.Title>Log out fr, gang?</Dialog.Title>
        <Dialog.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button onPress={() => setConfirmLogout(false)}>
              <Text>No</Text>
            </Button>

            <Button
              mode="contained"
              style={{ backgroundColor: colors.error }}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Yessir</Text>
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    logoutText: {
      color: "white",
      fontSize: typography.md,
    },
  });

{
  /* <Portal>
      <Modal
        visible={confirmLogout}
        onDismiss={() => setConfirmLogout(false)}
        style={{
          backgroundColor: colors.background,
          width: "100%",
          marginHorizontal: 40,
        }}
      >
        <Text>You sure you want to logout?</Text>
        <View style={{ height: 10 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button onPress={() => setConfirmLogout(false)}>
            <Text>No</Text>
          </Button>

          <Button
            mode="contained"
            style={{ backgroundColor: colors.error }}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>logout</Text>
          </Button>
        </View>
      </Modal>
    </Portal> */
}
