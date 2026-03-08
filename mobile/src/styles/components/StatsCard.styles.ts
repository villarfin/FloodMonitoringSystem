import { StyleSheet } from "react-native";
import { colors } from "../theme";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
  },
  value: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "800",
    marginTop: 2,
  },
  icon: {
    fontSize: 26,
  },
});

