import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>; // Optional style prop
};

export const SafeAreaWrapper = ({ children, style }: Props) => {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          padding: 16,
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};
