import { StyleSheet } from "react-native";

export const markdownStyles = (colors: any) =>
  StyleSheet.create({
    heading1: {
      color: colors.text,
    },
    //   heading2: {
    //     fontSize: 24,
    //   },
    //   heading3: {
    //     fontSize: 18,
    //   },
    //   heading4: {
    //     fontSize: 16,
    //   },
    //   heading5: {
    //     fontSize: 13,
    //   },
    //   heading6: {
    //     fontSize: 11,
    //   },
    body: {
      color: colors.text,
    },
    code_block: {
      color: "#000",
    },
  });
