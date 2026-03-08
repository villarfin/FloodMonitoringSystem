import { StyleSheet } from "react-native";
import { colors } from "../theme";

export const styles = StyleSheet.create({
  wrap: {
    borderLeftWidth: 4,
    borderRadius: 14,
    marginBottom: 10,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  message: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
});

