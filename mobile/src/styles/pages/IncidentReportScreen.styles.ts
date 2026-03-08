import { StyleSheet } from "react-native";
import { colors } from "../theme";

export const styles = StyleSheet.create({
  fieldLabel: {
    color: colors.text,
    fontWeight: "700",
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    color: colors.text,
    marginBottom: 4,
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  choicesWrap: {
    marginBottom: 4,
  },
  choice: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  choiceActive: {
    borderColor: colors.brand,
    backgroundColor: "#e7efff",
  },
  choiceText: {
    color: colors.textMuted,
    fontWeight: "600",
    fontSize: 12,
  },
  choiceTextActive: {
    color: colors.brand,
  },
  switchRow: {
    marginTop: 10,
    marginBottom: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  switchLabel: {
    color: colors.text,
    flex: 1,
    paddingRight: 10,
  },
  submit: {
    marginTop: 12,
    backgroundColor: colors.brand,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
  },
  preview: {
    marginTop: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
  },
  previewTitle: {
    color: colors.text,
    fontWeight: "800",
    marginBottom: 8,
  },
  previewText: {
    color: colors.textMuted,
    marginBottom: 3,
  },
  bold: {
    color: colors.text,
    fontWeight: "700",
  },
});

