import { useTheme } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { HomeIcon, PlusCircleIcon } from "react-native-heroicons/solid";

export default function Index() {
  const { colors } = useTheme() as any;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primaryDark,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="addPost"
        options={{
          headerTitle: "Add Post",
          headerTitleStyle: { color: colors.primaryDark },
          title: "Upload",
          tabBarIcon: ({ color }) => <PlusCircleIcon size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
