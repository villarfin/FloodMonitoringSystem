import { StyleSheet } from "react-native";
import { colors } from "../theme";

export const styles = StyleSheet.create({
  wrap: {
    borderRadius: 14,
    marginBottom: 10,
  },
  wrapActive: {
    backgroundColor: "#f0f7ff",
  },
  detailText: {
    color: colors.textMuted,
    marginBottom: 4,
  },
  detailNotes: {
    marginTop: 6,
    color: colors.text,
  },
  bold: {
    color: colors.text,
    fontWeight: "700",
  },
});

