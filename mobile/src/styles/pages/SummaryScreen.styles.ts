import { StyleSheet } from "react-native";
import { colors } from "../theme";

export const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    backgroundColor: colors.surface,
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
  },
  value: {
    color: colors.text,
    fontWeight: "700",
    marginTop: 3,
  },
  note: {
    color: colors.textMuted,
    marginTop: 8,
  },
});

